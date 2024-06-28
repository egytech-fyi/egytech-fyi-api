import { Context } from 'hono';
import { Bindings } from '../types/bindings';
import { REPOS_DATA } from '../utils/repos';



const reposHandler = async (c: Context<{ Bindings: Bindings }>) => {
  const GITHUB_BASE_URL = 'https://api.github.com/repos/';
  const GITHUB_TOKEN = c.env.GITHUB_TOKEN;


  if (!GITHUB_TOKEN) {
    console.error('GitHub token is not set in the environment variables');
    return c.json({ error: 'GitHub token is not set in the environment variables' }, 500);
  }

  try {
    const fetchRepoData = async (repo: string) => {
      const response = await fetch(`${GITHUB_BASE_URL}${repo}`, {
        headers: {
          Authorization:`Bearer ${GITHUB_TOKEN}`,
          'User-Agent': 'node-fetch'
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${repo}`);
      }

      return response.json();
    };

    const allRepoData = await Promise.all(REPOS_DATA.map((repo) => fetchRepoData(repo)));
    const sortedRepos = allRepoData.sort((a,b)=> b.stargazers_count - a.stargazers_count)
    return c.json(sortedRepos); 

  } catch (error: any) {
    console.error(error);
    return c.json({ error: error.message }, 500); 
  }
};

export default reposHandler;
