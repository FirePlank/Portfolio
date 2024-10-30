"use server";

async function getCommitCount(token: string) {
    const url = `https://api.github.com/search/commits?q=author:fireplank`;
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.cloak-preview'
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers,
            next: {
                revalidate: 300
            }
        });
        
        const data = await response.json();
        return data.total_count;
    } catch (error) {
        console.error('Error fetching commit count:', error);
        return 1000;
    }
}

export async function getStats() {
    const token = process.env.GITHUB_TOKEN ?? (() => {
        throw new Error('No GitHub token found');
    })();

    try {
        const reposResponse = await fetch('https://api.github.com/users/FirePlank/repos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            next: {
                revalidate: 300
            }
        });

        const reposData = await reposResponse.json();
        const totalCommits = await getCommitCount(token);
        const starsReceived = reposData.reduce((acc: number, repo: {
            stargazers_count: number;
        }) => acc + repo.stargazers_count, 0);
        const nonForkedRepos = reposData.filter((repo: { fork: boolean }) => !repo.fork);

        return {
            projectsCreated: nonForkedRepos.length,
            totalCommits,
            starsReceived
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        return null;
    }
}