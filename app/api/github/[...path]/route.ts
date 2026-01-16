import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const githubPath = path.join('/');
    
    const url = new URL(`https://api.github.com/${githubPath}`);
    
    // Forward query parameters
    request.nextUrl.searchParams.forEach((value, key) => {
      if (key !== 'path') {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const headers = new Headers({
      'Cache-Control': 's-maxage=300, stale-while-revalidate'
    });

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch from GitHub',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
