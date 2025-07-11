import Navication from "../../HomePage/Component/Navication.jsx"
import { useState, useRef, useEffect } from "react"
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Search,
  Send,
  X,
  Heart,
  Share2,
  Bookmark,
  MoreHorizontal,
  Sparkles,
  TrendingUp,
  Filter,
  Plus,
  Camera,
  MapPin,
  Clock,
} from "lucide-react"
import {
  InsertComment,
  InsertReplyComment,
  InsertLikeForReplyComment,
  InsertLikeForComment,
  InsertLikeForPost,
  InsertReportForPost,
  InsertReportForReply,
  getAllPosts,
  getAllPostsLikes,
  getAllCommentsLikes,
  getAllReplyCommentsLikes,
  InsertReportForReplyComment,
} from "../Code/SocialMediaData.js"
import { toast } from "react-toastify"
import NoImage from "../../../assets/NoImage.jpg"

export default function UserSocialMedia() {
  const user_id = Number.parseInt(localStorage.getItem("userId"))
  const initialPosts = []
  const initialPostComments = {}
    const currentUser = {
      id: user_id,
      name: localStorage.getItem("userName") ,
      username: localStorage.getItem("userName")?.toLowerCase().replace(/\s+/g, "_"),
      avatar: localStorage.getItem("userAvatar") || NoImage,
    }

  const [posts, setPosts] = useState(initialPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [expandedComments, setExpandedComments] = useState([])
  const [newComments, setNewComments] = useState({})
  const [newReplies, setNewReplies] = useState({})
  const [replyingTo, setReplyingTo] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const [postComments, setPostComments] = useState(initialPostComments)
  const [userLikes, setUserLikes] = useState({})
  const [postLikes, setPostLikes] = useState({})
  const [commentLikes, setCommentLikes] = useState({})
  const [replyLikes, setReplyLikes] = useState({})
  const [likedUsers, setLikedUsers] = useState({})
  const [commentLikedUsers, setCommentLikedUsers] = useState({})
  const [replyLikedUsers, setReplyLikedUsers] = useState({})
  const [createPostOpen, setCreatePostOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    featured: false,
    imageAttachments: [],
  })
  const [imagePreview, setImagePreview] = useState([])
  const fileInputRef = useRef(null)
  const [showLikesDialog, setShowLikesDialog] = useState(false)
  const [currentLikesId, setCurrentLikesId] = useState(null)
  const [likeType, setLikeType] = useState("post")
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportType, setReportType] = useState("")
  const [reportItemId, setReportItemId] = useState(null)
  const [reportReason, setReportReason] = useState("")
  const [reportParentId, setReportParentId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getAllPosts()
        if (postsData) {
          const mappedPosts = postsData.map((post) => ({
            id: post.post_id,
            title: post.title,
            content: post.content,
            author: {
              name: post.user.name,
              username: post.user.username,
              avatar: post.user.photo,
            },
            date: post.date,
            likes: post.likes,
            comments: post.comments,
            shares: 0,
            imageAttachments: post.imageAttachments.length > 0 ? post.imageAttachments : undefined,
            category: post.category,
            featured: false,
          }))

          const mappedComments = {}
          postsData.forEach((post) => {
            if (post.postComments && post.postComments.length > 0) {
              mappedComments[post.post_id] = post.postComments.map((comment) => ({
                id: comment.id,
                author: {
                  name: comment.author.name,
                  username: comment.author.username,
                  avatar: comment.author.avatar,
                },
                content: comment.content,
                date: comment.date,
                likes: comment.likes,
                replies: comment.replies.map((reply) => ({
                  id: reply.id,
                  author: {
                    name: reply.author.name,
                    username: reply.author.username,
                    avatar: reply.author.avatar,
                  },
                  content: reply.content,
                  date: reply.date,
                  likes: reply.likes || 0,
                })),
              }))
            }
          })

          setPosts(mappedPosts)
          setPostComments(mappedComments)

          const initialUserLikes = {}
          const initialCommentLikes = {}
          const initialReplyLikes = {}

          postsData.forEach((post) => {
            initialUserLikes[post.post_id] = false
            if (post.postComments) {
              post.postComments.forEach((comment) => {
                initialCommentLikes[`${post.post_id}-${comment.id}`] = false
                comment.replies.forEach((reply) => {
                  initialReplyLikes[`${post.post_id}-${comment.id}-${reply.id}`] = false
                })
              })
            }
          })

          const [postsLikesData, commentsLikesData, repliesLikesData] = await Promise.all([
            getAllPostsLikes(),
            getAllCommentsLikes(),
            getAllReplyCommentsLikes(),
          ])

          const updatedUserLikes = { ...initialUserLikes }
          const updatedLikedUsers = {}

          postsLikesData.forEach(({ post_id, liked_users }) => {
            updatedLikedUsers[post_id] = liked_users.map((user) => ({
              id: user.user_id,
              name: user.name,
              username: user.name.toLowerCase().replace(/\s+/g, "_"),
              avatar: user.photo || "/placeholder.svg",
            }))
            updatedUserLikes[post_id] = liked_users.some((user) => user.user_id === user_id)
          })

          const updatedCommentLikes = { ...initialCommentLikes }
          const updatedCommentLikedUsers = {}

          commentsLikesData.forEach(({ comment_id, liked_users }) => {
            const postId = Object.keys(mappedComments).find((postId) =>
              mappedComments[postId].some((comment) => comment.id === comment_id),
            )
            if (postId) {
              const likeKey = `${postId}-${comment_id}`
              updatedCommentLikedUsers[likeKey] = liked_users.map((user) => ({
                id: user.user_id,
                name: user.name,
                username: user.name.toLowerCase().replace(/\s+/g, "_"),
                avatar: user.photo || "/placeholder.svg",
              }))
              updatedCommentLikes[likeKey] = liked_users.some((user) => user.user_id === user_id)
            }
          })

          const updatedReplyLikes = { ...initialReplyLikes }
          const updatedReplyLikedUsers = {}

          repliesLikesData.forEach(({ reply_id, liked_users }) => {
            let found = false
            for (const postId in mappedComments) {
              for (const comment of mappedComments[postId]) {
                if (comment.replies.some((reply) => reply.id === reply_id)) {
                  const commentId = comment.id
                  const likeKey = `${postId}-${commentId}-${reply_id}`
                  updatedReplyLikedUsers[likeKey] = liked_users.map((user) => ({
                    id: user.user_id,
                    name: user.name,
                    username: user.name.toLowerCase().replace(/\s+/g, "_"),
                    avatar: user.photo || "/placeholder.svg",
                  }))
                  updatedReplyLikes[likeKey] = liked_users.some((user) => user.user_id === user_id)
                  found = true
                  break
                }
              }
              if (found) break
            }
          })

          setUserLikes(updatedUserLikes)
          setCommentLikes(updatedCommentLikes)
          setReplyLikes(updatedReplyLikes)
          setLikedUsers(updatedLikedUsers)
          setCommentLikedUsers(updatedCommentLikedUsers)
          setReplyLikedUsers(updatedReplyLikedUsers)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
        toast.error("Failed to load data. Please try again later.", { containerId: "other" })
      }
    }

    fetchData()
  }, [])

  const toggleComments = (postId) => {
    if (expandedComments.includes(postId)) {
      setExpandedComments(expandedComments.filter((id) => id !== postId))
    } else {
      setExpandedComments([...expandedComments, postId])
    }
  }

  const toggleLikes = (type, id) => {
    setLikeType(type)
    setCurrentLikesId(id)
    setShowLikesDialog(true)
  }

  const handlePostLike = async (postId) => {
    const newLikeStatus = !userLikes[postId]
    const likeData = {
      post_id: postId,
      user_id: user_id,
    }

    const result = await InsertLikeForPost(likeData)
    if (result) {
      setUserLikes({ ...userLikes, [postId]: newLikeStatus })
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, likes: newLikeStatus ? post.likes + 1 : post.likes - 1 } : post,
        ),
      )
      setLikedUsers((prev) => ({
        ...prev,
        [postId]: newLikeStatus
          ? [
              {
                id: currentUser.id,
                name: currentUser.name,
                username: currentUser.username,
                avatar: currentUser.avatar,
              },
              ...(prev[postId] || []),
            ]
          : (prev[postId] || []).filter((user) => user.id !== currentUser.id),
      }))
    }
  }

  const handleCommentLike = async (postId, commentId) => {
    const likeKey = `${postId}-${commentId}`
    const newLikeStatus = !commentLikes[likeKey]
    const likeData = {
      post_id: postId,
      user_id: user_id,
      comment_id: commentId,
    }

    const result = await InsertLikeForComment(likeData)
    if (result) {
      setCommentLikes({ ...commentLikes, [likeKey]: newLikeStatus })
      setPostComments((prev) => ({
        ...prev,
        [postId]: prev[postId]?.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                likes: newLikeStatus ? comment.likes + 1 : comment.likes - 1,
              }
            : comment,
        ),
      }))
      setCommentLikedUsers((prev) => ({
        ...prev,
        [likeKey]: newLikeStatus
          ? [
              {
                id: currentUser.id,
                name: currentUser.name,
                username: currentUser.username,
                avatar: currentUser.avatar,
              },
              ...(prev[likeKey] || []),
            ]
          : (prev[likeKey] || []).filter((user) => user.id !== currentUser.id),
      }))
    }
  }

  const handleReplyLike = async (postId, commentId, replyId) => {
    const likeKey = `${postId}-${commentId}-${replyId}`
    const newLikeStatus = !replyLikes[likeKey]
    const likeData = {
      post_id: postId,
      user_id: user_id,
      comment_id: commentId,
      reply_id: replyId,
    }

    const result = await InsertLikeForReplyComment(likeData)
    if (result) {
      setReplyLikes({ ...replyLikes, [likeKey]: newLikeStatus })
      setPostComments((prev) => {
        const updatedComments = { ...prev }
        if (updatedComments[postId]) {
          updatedComments[postId] = updatedComments[postId].map((comment) => {
            if (comment.id === commentId) {
              const updatedReplies = comment.replies.map((reply) => {
                if (reply.id === replyId) {
                  return {
                    ...reply,
                    likes: newLikeStatus ? reply.likes + 1 : reply.likes - 1,
                  }
                }
                return reply
              })
              return { ...comment, replies: updatedReplies }
            }
            return comment
          })
        }
        return updatedComments
      })
      setReplyLikedUsers((prev) => ({
        ...prev,
        [likeKey]: newLikeStatus
          ? [
              {
                id: currentUser.id,
                name: currentUser.name,
                username: currentUser.username,
                avatar: currentUser.avatar,
              },
              ...(prev[likeKey] || []),
            ]
          : (prev[likeKey] || []).filter((user) => user.id !== currentUser.id),
      }))
    }
  }

  const handleCommentSubmit = async (postId) => {
    if (!newComments[postId]?.trim()) {
      return
    }

    const commentData = {
      user_id: user_id,
      post_id: postId,
      comment_content: newComments[postId],
    }

    const result = await InsertComment(commentData)
    if (result) {
      const newCommentObj = {
        id: result.comment_id,
        author: {
          name: currentUser.name,
          username: currentUser.username,
          avatar: currentUser.avatar,
        },
        content: newComments[postId],
        date: result.comment_date || new Date().toISOString(),
        likes: 0,
        replies: [],
      }

      setPostComments((prev) => {
        const updatedComments = { ...prev }
        if (!updatedComments[postId]) {
          updatedComments[postId] = []
        }
        updatedComments[postId] = [newCommentObj, ...updatedComments[postId]]
        return updatedComments
      })

      setPosts(posts.map((post) => (post.id === postId ? { ...post, comments: post.comments + 1 } : post)))
      setNewComments({ ...newComments, [postId]: "" })
    }
  }

  const handleReplySubmit = async (postId, commentId) => {
    if (!newReplies[commentId]?.trim()) {
      return
    }

    const replyData = {
      user_id: user_id,
      comment_id: commentId,
      reply_content: newReplies[commentId],
    }

    const result = await InsertReplyComment(replyData)
    if (result) {
      const newReplyObj = {
        id: result.reply_id,
        author: {
          name: currentUser.name,
          username: currentUser.username,
          avatar: currentUser.avatar,
        },
        content: newReplies[commentId],
        date: result.reply_date || new Date().toISOString(),
        likes: 0,
      }

      setPostComments((prev) => {
        const updatedComments = { ...prev }
        if (updatedComments[postId]) {
          updatedComments[postId] = updatedComments[postId].map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...comment.replies, newReplyObj],
              }
            }
            return comment
          })
        }
        return updatedComments
      })

      setNewReplies({ ...newReplies, [commentId]: "" })
      setReplyingTo(null)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = [...newPost.imageAttachments];
      const newPreviews = [...imagePreview];
  
      Array.from(files).forEach((file) => {
        newImages.push(file); // store file
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          setImagePreview([...newPreviews]);
        };
        reader.readAsDataURL(file);
      });
  
      setNewPost({ ...newPost, imageAttachments: newImages });
    }
  };
  

  const handleRemoveImage = (index) => {
    const newPreviews = [...imagePreview]
    const newImages = [...newPost.imageAttachments]
    newPreviews.splice(index, 1)
    newImages.splice(index, 1)
    setImagePreview(newPreviews)
    setNewPost({ ...newPost, imageAttachments: newImages })
  }

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.category) {
      alert("Please fill in all required fields");
      return;
    }
  
    const formData = new FormData();
    const postData = {
      user_id: user_id,
      post_title: newPost.title,
      post_content: newPost.content,
      category: newPost.category,
    };
  
    formData.append("postData", JSON.stringify(postData));
  
    newPost.imageAttachments.forEach((file) => {
      formData.append("attachment", newPost.imageAttachments[0]);  // بدل "attachments"

    });
    console.log("formData:", JSON.stringify(formData, null, 2));
  
    try {
      console.log("formData:", formData);
      const response = await fetch("http://127.0.0.1:8000/posts/new", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      console.log(data)
  
      if (response.ok) {
        toast.success("Post created successfully!", { containerId: "other" });
  
        const newPostObj = {
          id: data.post_id,
          title: newPost.title,
          content: newPost.content,
          author: {
            name: currentUser.name,
            username: currentUser.username,
            avatar: currentUser.avatar,
          },
          date: new Date().toISOString().split("T")[0],
          likes: 0,
          comments: 0,
          shares: 0,
          imageAttachments: data.attachments ?? [],
          category: newPost.category,
          featured: newPost.featured,
        };
  
        setPosts([newPostObj, ...posts]);
        setNewPost({ title: "", content: "", category: "", featured: false, imageAttachments: [] });
        setImagePreview([]);
        setCreatePostOpen(false);
      } else {
        toast.error(`Failed to create post: ${data.detail || "Unknown error"}`, { containerId: "other" });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("An error occurred while creating the post.", { containerId: "other" });
    }
  };

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())

      if (categoryFilter === "all") return matchesSearch
      return matchesSearch && post.category === categoryFilter
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "likes") {
        return b.likes - a.likes
      } else if (sortBy === "comments") {
        return b.comments - a.comments
      }
      return 0
    })

  const tabFilteredPosts = filteredPosts.filter((post) => {
    if (activeTab === "all") return true
    if (activeTab === "featured") return post.featured
    return false
  })

  const currentPosts = tabFilteredPosts

  const categories = [
    "Product Updates",
    "Tips & Guides",
    "Customer Stories",
    "Industry News",
    "Events",
    "Farming",
    "Gardening",
    "Test",
  ]

  const handleReportSubmit = async () => {
    if (!reportReason) {
      alert("Please select a reason for reporting")
      return
    }

    let result = null
    if (reportType === "post") {
      const reportData = {
        post_id: reportItemId,
        user_id: user_id,
        note: reportReason,
      }
      result = await InsertReportForPost(reportData)
    } else if (reportType === "comment") {
      const reportData = {
        comment_id: reportItemId,
        user_id: user_id,
        note: reportReason,
      }
      result = await InsertReportForReplyComment(reportData)
    } else if (reportType === "reply") {
      const reportData = {
        reply_id: reportItemId,
        user_id: user_id,
        note: reportReason,
      }
      console.log(reportData)
      result = await InsertReportForReply(reportData)
    }

    if (result) {
      toast.success("Thank you for your report. Our team will review it shortly.", { containerId: "other" })
      setReportReason("")
      setShowReportDialog(false)
    }
  }

  const openReportDialog = (type, id, parentId = null) => {
    setReportType(type)
    setReportItemId(id)
    setReportParentId(parentId)
    setReportReason("")
    setShowReportDialog(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navication open={{is: "social media"}}/>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-24 pb-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
            <Sparkles className="w-4 h-4" />
            Welcome to Your Creative Space
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Share Your Story
          </h1>
          <p className="text-gray-600 text-lg">Connect, create, and inspire with your community</p>
        </div>

        {/* Create Post Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 mb-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                <img
                  src={currentUser.avatar || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <button
                onClick={() => setCreatePostOpen(true)}
                className="w-full text-left p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-blue-50 rounded-2xl border border-gray-200 hover:border-purple-300 transition-all duration-300 text-gray-500 hover:text-gray-700"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  {"What's on your mind? Share something amazing..."}
                </div>
              </button>
            </div>
            <button
              onClick={() => setCreatePostOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts, people, topics..."
                  className="w-full lg:w-80 pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="w-full sm:w-48 pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Most Recent</option>
                  <option value="likes">Most Liked</option>
                  <option value="comments">Most Discussed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                        <img
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          className="w-full h-full rounded-full object-cover bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{post.author.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                            {post.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-6 pb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{post.title}</h2>
                  <p className="text-gray-700 leading-relaxed mb-4 text-start">{post.content}</p>

                  {/* Post Images */}
                  {post.imageAttachments && post.imageAttachments.length > 0 && (
                    <div className="mb-4">
                      {post.imageAttachments.length === 1 ? (
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                          <img
                            src={post.imageAttachments[0] || "/placeholder.svg"}
                            alt={`${post.title} - image 1`}
                            className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {post.imageAttachments.map((image, index) => (
                            <div key={index} className="rounded-2xl overflow-hidden shadow-lg">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`${post.title} - image ${index + 1}`}
                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-white/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePostLike(post.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                            userLikes[post.id]
                              ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                              : "bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${userLikes[post.id] ? "fill-current" : ""}`} />
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        <button
                          onClick={() => toggleLikes("post", post.id)}
                          className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
                        >
                          {post.likes > 0 && "View likes"}
                        </button>
                      </div>

                      <button
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium">{post.comments}</span>
                        {expandedComments.includes(post.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openReportDialog("post", post.id)}
                        className="px-3 py-1 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {expandedComments.includes(post.id) && (
                  <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50/30 to-white/30">
                    <div className="p-6">
                      <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-blue-500" />
                        Comments ({postComments[post.id]?.length || 0})
                      </h4>

                      {/* Add Comment */}
                      <div className="mb-6 bg-white/60 rounded-2xl p-4 border border-gray-200">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                            <img
                              src={currentUser.avatar || "/placeholder.svg"}
                              alt="You"
                              className="w-full h-full rounded-full object-cover bg-white"
                            />
                          </div>
                          <div className="flex-1 flex gap-3">
                            <textarea
                              placeholder="Share your thoughts..."
                              value={newComments[post.id] || ""}
                              onChange={(e) =>
                                setNewComments({
                                  ...newComments,
                                  [post.id]: e.target.value,
                                })
                              }
                              className="flex-1 p-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                              rows={3}
                            />
                            <button
                              onClick={() => handleCommentSubmit(post.id)}
                              disabled={!newComments[post.id]?.trim()}
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                            >
                              <Send className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-4">
                        {postComments[post.id]?.map((comment) => (
                          <div key={comment.id} className="bg-white/60 rounded-2xl p-4 border border-gray-200">
                            <div className="flex gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                                <img
                                  src={comment.author.avatar || "/placeholder.svg"}
                                  alt={comment.author.name}
                                  className="w-full h-full rounded-full object-cover bg-white"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="bg-white/80 rounded-xl p-3 mb-2">
                                  <div className="flex justify-between items-start mb-1">
                                    <h5 className="font-semibold text-gray-900">{comment.author.name}</h5>
                                    <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
                                  </div>
                                  <p className="text-gray-700">{comment.content}</p>
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                  <button
                                    onClick={() => handleCommentLike(post.id, comment.id)}
                                    className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-300 ${
                                      commentLikes[`${post.id}-${comment.id}`]
                                        ? "bg-red-100 text-red-600"
                                        : "text-gray-500 hover:bg-red-50 hover:text-red-500"
                                    }`}
                                  >
                                    <Heart
                                      className={`w-4 h-4 ${commentLikes[`${post.id}-${comment.id}`] ? "fill-current" : ""}`}
                                    />
                                    <span>{comment.likes}</span>
                                  </button>

                                  <button
                                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                    className="text-gray-500 hover:text-blue-500 px-3 py-1 rounded-full hover:bg-blue-50 transition-all duration-300"
                                  >
                                    Reply
                                  </button>

                                  <button
                                    onClick={() => openReportDialog("comment", comment.id, post.id)}
                                    className="text-gray-500 hover:text-red-500 px-3 py-1 rounded-full hover:bg-red-50 transition-all duration-300"
                                  >
                                    Report
                                  </button>
                                </div>

                                {/* Reply Input */}
                                {replyingTo === comment.id && (
                                  <div className="mt-3 bg-white/60 rounded-xl p-3 border border-gray-200">
                                    <div className="flex gap-2">
                                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                                        <img
                                          src={currentUser.avatar || "/placeholder.svg"}
                                          alt="You"
                                          className="w-full h-full rounded-full object-cover bg-white"
                                        />
                                      </div>
                                      <div className="flex-1 flex gap-2">
                                        <input
                                          type="text"
                                          placeholder="Write a reply..."
                                          value={newReplies[comment.id] || ""}
                                          onChange={(e) =>
                                            setNewReplies({
                                              ...newReplies,
                                              [comment.id]: e.target.value,
                                            })
                                          }
                                          className="flex-1 p-2 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                        <button
                                          onClick={() => handleReplySubmit(post.id, comment.id)}
                                          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300"
                                        >
                                          <Send className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => setReplyingTo(null)}
                                          className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Replies */}
                                {comment.replies.length > 0 && (
                                  <div className="mt-3 ml-6 space-y-3">
                                    {comment.replies.map((reply) => (
                                      <div key={reply.id} className="bg-white/60 rounded-xl p-3 border border-gray-200">
                                        <div className="flex gap-3">
                                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                                            <img
                                              src={reply.author.avatar || "/placeholder.svg"}
                                              alt={reply.author.name}
                                              className="w-full h-full rounded-full object-cover bg-white"
                                            />
                                          </div>
                                          <div className="flex-1">
                                            <div className="bg-white/80 rounded-lg p-2 mb-1">
                                              <div className="flex justify-between items-start mb-1">
                                                <h6 className="font-medium text-gray-900 text-sm">
                                                  {reply.author.name}
                                                </h6>
                                                <span className="text-xs text-gray-500">{formatDate(reply.date)}</span>
                                              </div>
                                              <p className="text-gray-700 text-sm">{reply.content}</p>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs">
                                              <button
                                                onClick={() => handleReplyLike(post.id, comment.id, reply.id)}
                                                className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300 ${
                                                  replyLikes[`${post.id}-${comment.id}-${reply.id}`]
                                                    ? "bg-red-100 text-red-600"
                                                    : "text-gray-500 hover:bg-red-50 hover:text-red-500"
                                                }`}
                                              >
                                                <Heart
                                                  className={`w-3 h-3 ${replyLikes[`${post.id}-${comment.id}-${reply.id}`] ? "fill-current" : ""}`}
                                                />
                                                <span>{reply.likes}</span>
                                              </button>
                                              <button
                                                onClick={() => openReportDialog("reply", reply.id, comment.id)}
                                                className="text-gray-500 hover:text-red-500 px-2 py-1 rounded-full hover:bg-red-50 transition-all duration-300"
                                              >
                                                Report
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {!postComments[post.id]?.length && (
                          <div className="text-center py-8">
                            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Create Post Modal */}
        {createPostOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-12">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCreatePostOpen(false)}></div>
            <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-white/50 max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Create New Post</h2>
                    <p className="text-purple-100">Share your thoughts with the world</p>
                  </div>
                  <button
                    onClick={() => setCreatePostOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Post Title</label>
                  <input
                    type="text"
                    placeholder="What's your post about?"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    maxLength={100}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">{newPost.title.length}/100 characters</div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Content</label>
                  <textarea
                    placeholder="Tell your story..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={6}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" disabled>
                      Choose a category
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Images</label>
                  {imagePreview.length > 0 ? (
                    <div className="space-y-4">
                      <div className={`grid ${imagePreview.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
                        {imagePreview.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-48 object-cover rounded-2xl"
                            />
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2 text-gray-600 hover:text-purple-600"
                      >
                        <Camera className="w-5 h-5" />
                        Add more images
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full p-8 border-2 border-dashed border-gray-300 rounded-2xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 flex flex-col items-center justify-center gap-3 text-gray-600 hover:text-purple-600"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-purple-500" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Click to upload images</p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-3xl border-t border-gray-200">
                <div className="flex gap-3">
                  <button
                    onClick={() => setCreatePostOpen(false)}
                    className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePost}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Create Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Likes Dialog */}
        {showLikesDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLikesDialog(false)}></div>
            <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-white/50">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      {(likeType === "post"
                        ? likedUsers[currentLikesId]
                        : likeType === "comment"
                          ? commentLikedUsers[currentLikesId]
                          : replyLikedUsers[currentLikesId]
                      )?.length || 0}{" "}
                      Likes
                    </h3>
                    <p className="text-purple-100">People who liked this {likeType}</p>
                  </div>
                  <button
                    onClick={() => setShowLikesDialog(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {(likeType === "post"
                    ? likedUsers[currentLikesId]
                    : likeType === "comment"
                      ? commentLikedUsers[currentLikesId]
                      : replyLikedUsers[currentLikesId]
                  )?.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover bg-white"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                      <Heart className="w-5 h-5 text-red-500 fill-current" />
                    </div>
                  ))}
                  {!(likeType === "post"
                    ? likedUsers[currentLikesId]
                    : likeType === "comment"
                      ? commentLikedUsers[currentLikesId]
                      : replyLikedUsers[currentLikesId]) && (
                    <div className="text-center py-8">
                      <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No likes yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Dialog */}
        {showReportDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowReportDialog(false)}
            ></div>
            <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-white/50">
              <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      Report {reportType.charAt(0).toUpperCase() + reportType.slice(1)}
                    </h3>
                    <p className="text-red-100">Help us keep the community safe</p>
                  </div>
                  <button
                    onClick={() => setShowReportDialog(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Why are you reporting this content?
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" disabled>
                      Select a reason
                    </option>
                    <option value="inappropriate">Inappropriate content</option>
                    <option value="spam">Spam or misleading</option>
                    <option value="harassment">Harassment or bullying</option>
                    <option value="misinformation">False information</option>
                    <option value="other">Other reason</option>
                  </select>
                </div>

                {reportReason === "other" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Additional details</label>
                    <textarea
                      placeholder="Please provide more details about why you're reporting this content..."
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all duration-300"
                      rows={4}
                      onChange={(e) => setReportReason(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-6 rounded-b-3xl border-t border-gray-200">
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReportDialog(false)}
                    className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReportSubmit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
