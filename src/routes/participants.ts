import { Context } from 'hono';
import { appendQuery, appendYearsOfExperienceQuery, appendTechQuery, appendWorkSettingsQuery } from '../utils/queryHelpers';
import { maps } from '../utils/maps';
import { Bindings } from '../types/bindings';

const participantsHandler = async (c: Context<{ Bindings: Bindings }>) => {
  if (true) {
    return c.json('Will be supported after 20th of May, 2024');
  }

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
    const results = await c.env.DB.prepare(`SELECT * FROM participants_d3 ${whereClause}`).all();
    return c.json(results);
  } catch (e) {
    console.error(e);
    return c.json({ err: e }, 500);
  }
};

export default participantsHandler;
