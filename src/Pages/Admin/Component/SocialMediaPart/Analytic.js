export async function getAnalytics() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/social/analytics`);
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getTopPerformancePost() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/posts/top-performing`);
        if (!response.ok) {
          throw new Error('Failed to fetch top performance post data');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getReportedUsers() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/report/random-reports`);
        if (!response.ok) {
          throw new Error('Failed to fetch top performance post data');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getActiveUsers() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/social/top-engaged-users`);
        if (!response.ok) {
          throw new Error('Failed to fetch top performance post data');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getAnalyticsCategory() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/posts/content-by-category`);
        if (!response.ok) {
          throw new Error('Failed to fetch category analytics data');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getTotalLikesPost() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/posts/total-likes-last-7-months`);
        if (!response.ok) {
          throw new Error('Failed to fetch total likes in posts data');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getTotalPosts() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/posts/total-posts-last-7-months`);
        if (!response.ok) {
          throw new Error('Failed to fetch total posts data');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getTotalLikesComments() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/comments/total-likes-on-comments-last-7-months`);
        if (!response.ok) {
          throw new Error('Failed to fetch total likes in posts data');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getTotalComments() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/comments/total-comments-last-7-months`);
        if (!response.ok) {
          throw new Error('Failed to fetch total comments data');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }