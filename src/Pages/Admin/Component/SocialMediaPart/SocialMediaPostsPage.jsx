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
  Sparkles,
  Camera,
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
import NoImage from "../../../../assets/NoImage.jpg"

export default function SocialMediaPostsPage() {
  const user_id = Number.parseInt(localStorage.getItem("userId"))
  const currentUser = {
    id: user_id,
    name: localStorage.getItem("userName"),
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
  const [createPostOpen, setCreatePostOpen] = useState(false)
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    imageAttachments: [], // Changed to match UserSocialMedia
    featured: false,
  })
  const [imagePreviews, setImagePreviews] = useState([])
  const fileInputRef = useRef(null)
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
        initializeLikesAndComments(postsData)
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
      toast.error("Failed to load data. Please try again later.", { containerId: "other" })
    }
  }

  const initializeLikesAndComments = async (postsData) => {
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

  // Image handling adapted from UserSocialMedia
  const handleImageUpload = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newImages = [...newPost.imageAttachments]
      const newPreviews = [...imagePreviews]

      Array.from(files).forEach((file) => {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Max 5MB.`, { containerId: "other" })
          return
        }
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image.`, { containerId: "other" })
          return
        }
        newImages.push(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews.push(reader.result)
          setImagePreviews([...newPreviews])
        }
        reader.readAsDataURL(file)
      })

      setNewPost({ ...newPost, imageAttachments: newImages })
    }
  }

  const handleRemoveImage = (index) => {
    const newPreviews = [...imagePreviews]
    const newImages = [...newPost.imageAttachments]
    newPreviews.splice(index, 1)
    newImages.splice(index, 1)
    setImagePreviews(newPreviews)
    setNewPost({ ...newPost, imageAttachments: newImages })
  }

  // Post creation adapted from UserSocialMedia
  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.category) {
      toast.error("Please fill in all required fields", { containerId: "other" })
      return
    }

    setIsCreatingPost(true)

    const formData = new FormData()
    const postData = {
      user_id: user_id,
      post_title: newPost.title,
      post_content: newPost.content,
      category: newPost.category,
    }

    formData.append("postData", JSON.stringify(postData))

    newPost.imageAttachments.forEach((file) => {
      formData.append("attachments", file)
    })

    try {
      const response = await fetch("http://localhost:8000/posts/new", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Post created successfully!", { containerId: "other" })

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
          imageAttachments: data.attachments ?? [],
          category: newPost.category,
          featured: newPost.featured,
        }

        setPosts([newPostObj, ...posts])
        setNewPost({ title: "", content: "", category: "", imageAttachments: [], featured: false })
        setImagePreviews([])
        setCreatePostOpen(false)
      } else {
        toast.error(`Failed to create post: ${data.detail || "Unknown error"}`, { containerId: "other" })
      }
    } catch (error) {
      console.error("Error creating post:", error)
      toast.error("An error occurred while creating the post.", { containerId: "other" })
    } finally {
      setIsCreatingPost(false)
    }
  }

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="relative z-10 max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/socialMedia"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 w-10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex flex-col gap-1 items-start">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent m-0">
                Social Media Posts
              </h1>
              <p className="text-gray-600 text-lg m-0">Connect, create, and inspire with your community</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2">
              <Download className="h-4 w-4" />
              Export Posts
            </button>
            <button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setCreatePostOpen(true)}
            >
              Create New Post
            </button>
          </div>
        </div>
      </div>

      {/* Create Post Card */}
      <div className="relative z-10 max-w-4xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300">
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
              <ImageIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="relative z-10 max-w-4xl mx-auto mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts, people, topics..."
                  className="w-full md:w-80 pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select
                  className="w-full sm:w-48 pl-4 pr-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none"
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
                <select
                  className="pl-4 pr-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none"
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
      </div>

      {/* Posts List */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {currentPosts.length > 0 ? (
          <>
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="p-6">
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
                          <p className="text-sm text-gray-500">
                            Posted on {new Date(post.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          {post.category}
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3 leading-tight">{post.title}</h2>
                      <p className="text-gray-700 leading-relaxed mb-4 text-start">{post.content}</p>

                      {/* Images */}
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

                      {/* Actions */}
                      <div className="flex items-center gap-4 mt-4 border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-2">
                          <button
                            className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 ${
                              userLikes[post.id]
                                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                                : "bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500"
                            }`}
                            onClick={() => handlePostLike(post.id)}
                          >
                            <ThumbsUp className={`h-5 w-5 ${userLikes[post.id] ? "fill-current" : ""}`} />
                            <span className="ml-2 font-medium">{post.likes}</span>
                          </button>
                        </div>
                        <button
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-500 gap-1"
                          onClick={() => toggleComments(post.id)}
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span className="font-medium">{post.comments}</span>
                          {expandedComments.includes(post.id) ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </button>
                      </div>

                      {/* Comments Section */}
                      {expandedComments.includes(post.id) && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-blue-500" />
                            Comments ({postComments[post.id]?.length || 0})
                          </h4>
                          <div className="space-y-4">
                            {postComments[post.id]?.length ? (
                              postComments[post.id].map((comment) => (
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
                                      <div className="bg-white/80 rounded-xl p-3">
                                        <p className="font-semibold text-gray-900 m-0">{comment.author.name}</p>
                                        <p className="mt-1 text-gray-700 text-start">{comment.content}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8">
                                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                              </div>
                            )}
                          </div>

                          {/* Add Comment */}
                          <div className="mt-6 bg-white/60 rounded-2xl p-4 border border-gray-200">
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
                                    setNewComments((prev) => ({
                                      ...prev,
                                      [post.id]: e.target.value,
                                    }))
                                  }
                                  className="flex-1 p-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                  rows={3}
                                />
                                <button
                                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
                                  onClick={() => handleCommentSubmit(post.id)}
                                  disabled={!newComments[post.id]?.trim()}
                                >
                                  Comment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
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
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
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
          <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for</p>
            <button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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

      {/* Create Post Modal */}
      {createPostOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setCreatePostOpen(false)}
          ></div>
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
                  disabled={isCreatingPost}
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
                {imagePreviews.length > 0 ? (
                  <div className="space-y-4">
                    <div className={`grid ${imagePreviews.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
                      {imagePreviews.map((preview, index) => (
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
                            <X className="w-4 w-4" />
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
                  disabled={isCreatingPost}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
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
        </div>
      )}
    </div>
  )
}