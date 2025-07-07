import { toast } from 'react-toastify';

export async function InsertPost(post) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/posts/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Post created successfully!", { containerId: "other" });
      return data; // Expected: { id, user_id, post_title, post_content, category, attachments, ... }
    } else {
      toast.error(`Failed to create post: ${data.message || 'Unknown error'}`, { containerId: "other" });
      return null;
    }
  } catch (error) {
    console.error("Error during post creation:", error);
    toast.error("An error occurred while creating the post.", { containerId: "other" });
    return null;
  }
}

export async function InsertComment(comment) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/comments/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Comment created successfully!", { containerId: "other" });
        return data; // Expected: { id, user_id, post_title, post_content, category, attachments, ... }
      } else {
        toast.error(`Failed to create comment: ${data.message || 'Unknown error'}`, { containerId: "other" });
        return null;
      }
    } catch (error) {
      console.error("Error during comment creation:", error);
      toast.error("An error occurred while creating the comment.", { containerId: "other" });
      return null;
    }
  }

  export async function InsertReplyComment(reply) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/replies/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reply),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Reply Comment created successfully!", { containerId: "other" });
        return data; // Expected: { id, user_id, post_title, post_content, category, attachments, ... }
      } else {
        toast.error(`Failed to create reply comment: ${data.message || 'Unknown error'}`, { containerId: "other" });
        return null;
      }
    } catch (error) {
      console.error("Error during reply comment creation:", error);
      toast.error("An error occurred while creating the reply comment.", { containerId: "other" });
      return null;
    }
  }

  export async function InsertLikeForPost(info) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/posts/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(`Post ${data.message}!`, { containerId: "other" });
        return data;
      } else {
        toast.error(`Failed to update like: ${data.message || 'Unknown error'}`, { containerId: "other" });
        return null;
      }
    } catch (error) {
      console.error("Error during post like update:", error);
      toast.error("An error occurred while updating the post like.", { containerId: "other" });
      return null;
    }
  }
  
  export async function InsertLikeForComment(info) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/comments/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(`Comment ${data.message}!`, { containerId: "other" });
        return data;
      } else {
        toast.error(`Failed to update like: ${data.message || 'Unknown error'}`, { containerId: "other" });
        return null;
      }
    } catch (error) {
      console.error("Error during comment like update:", error);
      toast.error("An error occurred while updating the comment like.", { containerId: "other" });
      return null;
    }
  }
  
  export async function InsertLikeForReplyComment(info) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/replies/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(`Reply ${data.message}!`, { containerId: "other" });
        return data;
      } else {
        toast.error(`Failed to update like: ${data.message || 'Unknown error'}`, { containerId: "other" });
        return null;
      }
    } catch (error) {
      console.error("Error during reply like update:", error);
      toast.error("An error occurred while updating the reply like.", { containerId: "other" });
      return null;
    }
  }


  export async function InsertReportForPost(info) {
    try {
      const response = await fetch(`http://localhost:8000/report/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Post reported successfully!", { containerId: "other" });
        return data;
      } else {
        toast.error(`Failed to submit report: ${data.message || 'Unknown error'}`, { containerId: "other" });
        return null;
      }
    } catch (error) {
      console.error("Error during post report submission:", error);
      toast.error("An error occurred while submitting the post report.", { containerId: "other" });
      return null;
    }
  }
  
  export async function InsertReportForComment(info) {
    try {
      const response = await fetch(`http://localhost:8000/report/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Comment reported successfully!", { containerId: "other" });
        return data;
      } else {
        toast.error(`Failed to submit report: ${data.message || 'Unknown error'}`, { containerId: "other" });
        return null;
      }
    } catch (error) {
      console.error("Error during comment report submission:", error);
      toast.error("An error occurred while submitting the comment report.", { containerId: "other" });
      return null;
    }
  }

  export async function InsertReportForReplyComment(info) {
    try {
      const response = await fetch(`http://localhost:8000/report/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(" Reply comment reported successfully!", { containerId: "other" });
        return data;
      } else {
        toast.error(`Failed to submit report: ${data.message || 'Unknown error'}`, { containerId: "other" });
        return null;
      }
    } catch (error) {
      console.error("Error during comment report submission:", error);
      toast.error("An error occurred while submitting the comment report.", { containerId: "other" });
      return null;
    }
  }

  export async function InsertReportForReply(info) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/report/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Reply comment reported successfully!", { containerId: "other" });
        return data;
      } else {
        toast.error(`Failed to submit report: ${data.message || 'Unknown error'}`, { containerId: "other" });
        return null;
      }
    } catch (error) {
      console.error("Error during reply comment report submission:", error);
      toast.error("An error occurred while submitting the comment report.", { containerId: "other" });
      return null;
    }
  }

  export async function getAllPosts(){
    let data;
    try {
        const response = await fetch(`http://localhost:8000/social/posts/full`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}

export async function getAllPostsLikes(){
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/posts/all-with-likes`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}

export async function getAllCommentsLikes(){
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/comments/all-with-likes`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}

export async function getAllReplyCommentsLikes(){
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/replies/all-with-likes`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}