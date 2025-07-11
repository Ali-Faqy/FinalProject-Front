"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  ImageIcon,
  MessageCircle,
  Search,
  ThumbsUp,
  X,
} from "lucide-react"
import {
  InsertComment,
  InsertLikeForPost,
  getAllPosts,
  getAllPostsLikes,
  getAllCommentsLikes,
  getAllReplyCommentsLikes,
} from "../../../ScoialMedia/Code/SocialMediaData.js"
import { toast } from "react-toastify"
import NoImage from "../../../../assets/NoImage.jpg "
export default function SocialMediaPostsPage() {
  const user_id = Number.parseInt(localStorage.getItem("userId"))
  const currentUser = {
    id: user_id,
    name: localStorage.getItem("userName") ,
    username: localStorage.getItem("userName")?.toLowerCase().replace(/\s+/g, "_"),
    avatar: localStorage.getItem("userAvatar") || NoImage,
  }

  // State
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedComments, setExpandedComments] = useState([])
  const [newComments, setNewComments] = useState({})
  const [newReplies, setNewReplies] = useState({})
  const [replyingTo, setReplyingTo] = useState(null)
  const [postComments, setPostComments] = useState({})
  const [userLikes, setUserLikes] = useState({})
  const [commentLikes, setCommentLikes] = useState({})
  const [replyLikes, setReplyLikes] = useState({})
  const [likedUsers, setLikedUsers] = useState({})
  const [commentLikedUsers, setCommentLikedUsers] = useState({})
  const [replyLikedUsers, setReplyLikedUsers] = useState({})

  // Simplified Create Post State
  const [createPostOpen, setCreatePostOpen] = useState(false)
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    images: [],
  })
  const [imagePreviews, setImagePreviews] = useState([])
  const fileInputRef = useRef(null)

  // Other dialogs
  const [showLikesDialog, setShowLikesDialog] = useState(false)
  const [currentLikesId, setCurrentLikesId] = useState(null)
  const [likeType, setLikeType] = useState("post")
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportType, setReportType] = useState("")
  const [reportItemId, setReportItemId] = useState(null)
  const [reportReason, setReportReason] = useState("")

  const postsPerPage = 5
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

  // Fetch data on mount
  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
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
          imageAttachments: post.imageAttachments?.length > 0 ? post.imageAttachments : undefined,
          category: post.category,
          featured: false,
        }))
        setPosts(mappedPosts)

        // Initialize likes and comments data
        initializeLikesAndComments(postsData)
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
      toast.error("Failed to load data. Please try again later.", { containerId: "other" })
    }
  }

  const initializeLikesAndComments = async (postsData) => {
    // Initialize comments
    const mappedComments = {}
    postsData.forEach((post) => {
      if (post.postComments?.length > 0) {
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
    setPostComments(mappedComments)

    // Initialize likes
    try {
      const [postsLikesData, commentsLikesData, repliesLikesData] = await Promise.all([
        getAllPostsLikes(),
        getAllCommentsLikes(),
        getAllReplyCommentsLikes(),
      ])

      const initialUserLikes = {}
      const initialLikedUsers = {}

      postsLikesData.forEach(({ post_id, liked_users }) => {
        initialLikedUsers[post_id] = liked_users.map((user) => ({
          id: user.user_id,
          name: user.name,
          username: user.name.toLowerCase().replace(/\s+/g, "_"),
          avatar: user.photo || "/placeholder.svg",
        }))
        initialUserLikes[post_id] = liked_users.some((user) => user.user_id === user_id)
      })

      setUserLikes(initialUserLikes)
      setLikedUsers(initialLikedUsers)
    } catch (error) {
      console.error("Failed to load likes data:", error)
    }
  }

  // Simplified image handling
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || [])

    if (files.length === 0) return

    const validFiles = []
    const previews = []

    files.forEach((file) => {
      // Validate file
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max 5MB.`, { containerId: "other" })
        return
      }

      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image.`, { containerId: "other" })
        return
      }

      validFiles.push(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        previews.push(e.target.result)
        if (previews.length === validFiles.length) {
          setImagePreviews([...imagePreviews, ...previews])
          setNewPost((prev) => ({
            ...prev,
            images: [...prev.images, ...validFiles],
          }))
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    setNewPost((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  // Simplified post creation
  const createPost = async () => {
    // Validate
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.category) {
      toast.error("Please fill in all required fields", { containerId: "other" })
      return
    }

    setIsCreatingPost(true)

    try {
      const formData = new FormData()

      // ✅ This is perfect — send all post info in one key
      formData.append("postData", JSON.stringify({
        user_id: user_id,
        post_title: newPost.title,
        post_content: newPost.content,
        category: newPost.category,
      }))

      // ✅ This is also perfect — send each image file under the same key
      newPost.images.forEach((file) => {
        formData.append("attachments", file)
      })
      // Send request})

      const response = await fetch("http://localhost:8000/posts/new", {
        method: "POST",
        body: formData
      })

      // Add new post to state
      const newPostObj = {
        id: result.post_id,
        title: newPost.title,
        content: newPost.content,
        author: currentUser,
        date: new Date().toISOString().split("T")[0],
        likes: 0,
        comments: 0,
        imageAttachments: result.attachments || [],
        category: newPost.category,
        featured: false,
      }

      setPosts((prev) => [newPostObj, ...prev])

      // Reset form
      setNewPost({ title: "", content: "", category: "", images: [] })
      setImagePreviews([])
      setCreatePostOpen(false)

      toast.success("Post created successfully!", { containerId: "other" })
    } catch (error) {
      console.error("Failed to create post:", error)
      toast.error("Failed to create post. Please try again.", { containerId: "other" })
    } finally {
      setIsCreatingPost(false)
    }
  }

  // Other handlers (simplified versions)
  const handlePostLike = async (postId) => {
    const newLikeStatus = !userLikes[postId]
    const likeData = { post_id: postId, user_id: user_id }

    const result = await InsertLikeForPost(likeData)
    if (result) {
      setUserLikes((prev) => ({ ...prev, [postId]: newLikeStatus }))
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, likes: newLikeStatus ? post.likes + 1 : post.likes - 1 } : post,
        ),
      )
    }
  }

  const toggleComments = (postId) => {
    setExpandedComments((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const handleCommentSubmit = async (postId) => {
    if (!newComments[postId]?.trim()) return

    const commentData = {
      user_id: user_id,
      post_id: postId,
      comment_content: newComments[postId],
    }

    const result = await InsertComment(commentData)
    if (result) {
      const newCommentObj = {
        id: result.comment_id,
        author: currentUser,
        content: newComments[postId],
        date: result.comment_date || new Date().toISOString(),
        likes: 0,
        replies: [],
      }

      setPostComments((prev) => ({
        ...prev,
        [postId]: [newCommentObj, ...(prev[postId] || [])],
      }))

      setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, comments: post.comments + 1 } : post)))

      setNewComments((prev) => ({ ...prev, [postId]: "" }))
      toast.success("Comment posted successfully!", { containerId: "other" })
    }
  }

  // Filter and pagination
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
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "likes") return b.likes - a.likes
      if (sortBy === "comments") return b.comments - a.comments
      return 0
    })

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to="/socialMedia"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 w-10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex flex-col gap-1 items-start">
            <h1 className="text-3xl font-bold tracking-tight text-black m-0">Social Media Posts</h1>
            <p className="text-muted-foreground m-0">View and manage all posts</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2">
            <Download className="h-4 w-4" />
            Export Posts
          </button>
          <button
            className="h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium bg-black text-white"
            onClick={() => setCreatePostOpen(true)}
          >
            Create New Post
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-[180px]">
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-[180px]">
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Most Recent</option>
              <option value="likes">Most Liked</option>
              <option value="comments">Most Commented</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {currentPosts.length > 0 ? (
          <>
            {currentPosts.map((post) => (
              <div key={post.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <img
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        className="aspect-square h-full w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                          <p className="font-medium text-black m-0">{post.author.name}</p>
                          <p className="text-sm text-muted-foreground m-0">
                            Posted on {new Date(post.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-black text-white">
                            {post.category}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="mt-1 text-black text-start">{post.content}</p>

                        {/* Images */}
                        {post.imageAttachments && post.imageAttachments.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {post.imageAttachments.length === 1 ? (
                              <div className="rounded-lg overflow-hidden border">
                                <img
                                  src={post.imageAttachments[0] || "/placeholder.svg"}
                                  alt={`${post.title} - image 1`}
                                  className="w-full h-64 object-cover"
                                />
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-2">
                                {post.imageAttachments.map((image, index) => (
                                  <div key={index} className="rounded-lg overflow-hidden border">
                                    <img
                                      src={image || "/placeholder.svg"}
                                      alt={`${post.title} - image ${index + 1}`}
                                      className="w-full h-40 object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center">
                            <button
                              className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2 ${
                                userLikes[post.id] ? "text-blue-500" : ""
                              }`}
                              onClick={() => handlePostLike(post.id)}
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </button>
                            <span className="text-sm">{post.likes}</span>
                          </div>
                          <button
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-1"
                            onClick={() => toggleComments(post.id)}
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                            {expandedComments.includes(post.id) ? (
                              <ChevronUp className="h-3 w-3 ml-1" />
                            ) : (
                              <ChevronDown className="h-3 w-3 ml-1" />
                            )}
                          </button>
                        </div>

                        {/* Comments Section */}
                        {expandedComments.includes(post.id) && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium mb-4">Comments</h4>
                            <div className="space-y-4">
                              {postComments[post.id]?.length ? (
                                postComments[post.id].map((comment) => (
                                  <div key={comment.id} className="flex gap-3">
                                    <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                      <img
                                        src={comment.author.avatar || "/placeholder.svg"}
                                        alt={comment.author.name}
                                        className="aspect-square h-full w-full"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <div className="bg-muted p-3 rounded-lg">
                                        <p className="font-medium text-sm text-black m-0">{comment.author.name}</p>
                                        <p className="mt-1 text-sm text-black text-start">{comment.content}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-center text-muted-foreground py-4">No comments yet</p>
                              )}
                            </div>

                            {/* Add Comment */}
                            <div className="mt-4 flex gap-3">
                              <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                <img
                                  src={currentUser.avatar || "/placeholder.svg"}
                                  alt="You"
                                  className="aspect-square h-full w-full"
                                />
                              </div>
                              <div className="flex-1 flex gap-2">
                                <textarea
                                  placeholder="Write a comment..."
                                  value={newComments[post.id] || ""}
                                  onChange={(e) =>
                                    setNewComments((prev) => ({
                                      ...prev,
                                      [post.id]: e.target.value,
                                    }))
                                  }
                                  className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <button
                                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4"
                                  onClick={() => handleCommentSubmit(post.id)}
                                  disabled={!newComments[post.id]?.trim()}
                                >
                                  Comment
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * postsPerPage + 1}-
                {Math.min(currentPage * postsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
              </p>
              <div className="flex items-center gap-1">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 w-10"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-input hover:bg-accent hover:text-accent-foreground"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 w-10"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts match your search criteria</p>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-4"
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("all")
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Simplified Create Post Dialog */}
      {createPostOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setCreatePostOpen(false)}></div>
          <div className="z-50 grid w-full max-w-lg gap-4 border bg-white p-6 shadow-lg sm:rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2 className="text-lg font-semibold leading-none tracking-tight">Create New Post</h2>
              <p className="text-sm text-muted-foreground">Share your thoughts with the community</p>
            </div>

            <div className="grid gap-4 py-4">
              {/* Title */}
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <input
                  id="title"
                  placeholder="Enter post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
                  maxLength={100}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <div className="text-xs text-muted-foreground text-right">{newPost.title.length}/100 characters</div>
              </div>

              {/* Content */}
              <div className="grid gap-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Content
                </label>
                <textarea
                  id="content"
                  placeholder="What's on your mind?"
                  value={newPost.content}
                  onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              {/* Category */}
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  value={newPost.category}
                  onChange={(e) => setNewPost((prev) => ({ ...prev, category: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Images */}
              <div className="grid gap-2">
                <label className="text-sm font-medium">Images (Optional)</label>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Button */}
                <button
                  type="button"
                  className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to add images</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB each</p>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                onClick={() => setCreatePostOpen(false)}
                disabled={isCreatingPost}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 disabled:opacity-50"
                onClick={createPost}
                disabled={isCreatingPost || !newPost.title.trim() || !newPost.content.trim() || !newPost.category}
              >
                {isCreatingPost ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  "Create Post"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
