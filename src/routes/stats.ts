import { Context } from 'hono';
import { appendQuery, appendYearsOfExperienceQuery, appendTechQuery, appendWorkSettingsQuery } from '../utils/queryHelpers';
import { maps } from '../utils/maps';
import { Bindings } from '../types/bindings';

const statsHandler = async (c: Context<{ Bindings: Bindings }>) => {
  const workSettings = ['Office', 'Hybrid', 'Remote/Egypt'];
  const conditions: string[] = [];

  appendQuery(conditions, c.req.query('title'), 'Title', maps.title);
  appendQuery(conditions, c.req.query('level'), 'Level', maps.level);
  appendQuery(conditions, c.req.query('gender'), 'Gender', maps.gender);
  appendQuery(conditions, c.req.query('cs_degree'), 'Degree', maps.degree);
  appendQuery(conditions, c.req.query('business_market'), 'BusinessMarket', maps.businessMarket);
  appendQuery(conditions, c.req.query('business_size'), 'BusinessSize', maps.businessSize);
  appendQuery(conditions, c.req.query('business_focus'), 'BusinessFocus', maps.businessFocus);
  appendQuery(conditions, c.req.query('business_line'), 'BusinessLine', maps.businessLine);
  appendYearsOfExperienceQuery(conditions, c.req.query('yoe_from_included'), c.req.query('yoe_to_excluded'));
  appendTechQuery(conditions, c.req.query('programming_language'), 'ProgrammingLanguages', maps.programmingLanguage);

  const includeRelocated = c.req.query('include_relocated');
  if (includeRelocated === 'true') {
    workSettings.push('Relocated');
  }

  const includeRemoteAbroad = c.req.query('include_remote_abroad');
  if (includeRemoteAbroad === 'true') {
    workSettings.push('Remote/Abroad');
  }

  appendWorkSettingsQuery(conditions, workSettings);
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  try {
    const bucketsResults = await c.env.DB.prepare(`
      SELECT
        CASE
          WHEN TotalCompensationEgp >= 0 AND TotalCompensationEgp < 3000 THEN '0-3K'
          WHEN TotalCompensationEgp >= 3000 AND TotalCompensationEgp < 6000 THEN '3-6K'
          WHEN TotalCompensationEgp >= 6000 AND TotalCompensationEgp < 9000 THEN '6-9K'
          WHEN TotalCompensationEgp >= 9000 AND TotalCompensationEgp < 12000 THEN '9-12K'
          WHEN TotalCompensationEgp >= 12000 AND TotalCompensationEgp < 15000 THEN '12-15K'
          WHEN TotalCompensationEgp >= 15000 AND TotalCompensationEgp < 20000 THEN '15-20K'
          WHEN TotalCompensationEgp >= 20000 AND TotalCompensationEgp < 25000 THEN '20-25K'
          WHEN TotalCompensationEgp >= 25000 AND TotalCompensationEgp < 30000 THEN '25-30K'
          WHEN TotalCompensationEgp >= 30000 AND TotalCompensationEgp < 35000 THEN '30-35K'
          WHEN TotalCompensationEgp >= 35000 AND TotalCompensationEgp < 40000 THEN '35-40K'
          WHEN TotalCompensationEgp >= 40000 AND TotalCompensationEgp < 45000 THEN '40-45K'
          WHEN TotalCompensationEgp >= 45000 AND TotalCompensationEgp < 50000 THEN '45-50K'
          WHEN TotalCompensationEgp >= 50000 AND TotalCompensationEgp < 60000 THEN '50-60K'
          WHEN TotalCompensationEgp >= 60000 AND TotalCompensationEgp < 70000 THEN '60-70K'
          WHEN TotalCompensationEgp >= 70000 AND TotalCompensationEgp < 80000 THEN '70-80K'
          WHEN TotalCompensationEgp >= 80000 AND TotalCompensationEgp < 100000 THEN '80-100K'
          WHEN TotalCompensationEgp >= 100000 AND TotalCompensationEgp < 120000 THEN '100-120K'
          WHEN TotalCompensationEgp >= 120000 AND TotalCompensationEgp < 140000 THEN '120-140K'
          WHEN TotalCompensationEgp >= 140000 AND TotalCompensationEgp < 160000 THEN '140-160K'
          WHEN TotalCompensationEgp >= 160000 AND TotalCompensationEgp < 180000 THEN '160-180K'
          WHEN TotalCompensationEgp >= 180000 AND TotalCompensationEgp < 200000 THEN '180-200K'
          WHEN TotalCompensationEgp >= 200000 AND TotalCompensationEgp < 230000 THEN '200-230K'
          WHEN TotalCompensationEgp >= 230000 AND TotalCompensationEgp < 260000 THEN '230-260K'
          ELSE '260K+' END AS bucket,
        COUNT(*) AS count
      FROM participants_d3
      ${whereClause}
      GROUP BY bucket
      ORDER BY MIN(TotalCompensationEgp)
    `).all();

    const percentilesResults = await c.env.DB.prepare(`
      WITH RankedCompensations AS (
        SELECT 
          TotalCompensationEgp,
          ROW_NUMBER() OVER (ORDER BY TotalCompensationEgp) AS RowAsc,
          COUNT(*) OVER () AS TotalCount
        FROM participants_d3
        ${whereClause}
      )
      SELECT
        TotalCount as totalCount,
        MAX(CASE WHEN RowAsc = ROUND(TotalCount/2) THEN TotalCompensationEgp ELSE NULL END) AS median,
        MAX(CASE WHEN RowAsc = ROUND(TotalCount * 0.20) THEN TotalCompensationEgp ELSE NULL END) AS p20Compensation,
        MAX(CASE WHEN RowAsc = ROUND(TotalCount * 0.75) THEN TotalCompensationEgp ELSE NULL END) AS p75Compensation,
        MAX(CASE WHEN RowAsc = ROUND(TotalCount * 0.90) THEN TotalCompensationEgp ELSE NULL END) AS p90Compensation
      FROM RankedCompensations
    `).all();

    const stats = percentilesResults.results[0];
    const buckets = bucketsResults.results;

    const results = { stats, buckets };

    if (!results.stats.totalCount) {
      results.stats.totalCount = 0;
    }
    return c.json(results);
  } catch (e) {
    console.error(e);
    return c.json({ err: e }, 500);
  }
};

export default statsHandler;
