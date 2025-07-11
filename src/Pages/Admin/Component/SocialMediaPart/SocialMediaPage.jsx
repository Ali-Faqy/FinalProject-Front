import { Flag, MessageCircle, ThumbsUp, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Layout from "../../UI/Layout.jsx"
import PageContainer from "../../UI/PageContainer.jsx"
import {
  getAnalytics,
  getTopPerformancePost,
  getReportedUsers,
  getActiveUsers,
  getAnalyticsCategory,
  getTotalLikesPost,
  getTotalPosts,
  getTotalLikesComments,
  getTotalComments,
} from "./Analytic.js"
import NoImage from "../../../../assets/NoImage.jpg"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function SocialMediaPage() {
  const [analytics, setAnalytics] = useState(null)
  const [topPosts, setTopPosts] = useState(null)
  const [reportedUser, setReportedUser] = useState(null)
  const [activeUsers, setActiveUsers] = useState(null)
  const [categoryData, setCategoryData] = useState([])
  const [engagementData, setEngagementData] = useState([])

  const fetchAnalytics = async () => {
    const data = await getAnalytics()
    if (!data) {
      console.error("Failed to fetch analytics data")
      return
    }
    setAnalytics(data)
  }

  const fetchTopPost = async () => {
    const data = await getTopPerformancePost()
    if (!data) {
      console.error("Failed to fetch post data")
      return
    }
    setTopPosts(data)
  }

  const fetchReportedUsers = async () => {
    const data = await getReportedUsers()
    if (!data) {
      console.error("Failed to fetch report users data")
      return
    }
    setReportedUser(data)
  }

  const fetchActiveUser = async () => {
    const data = await getActiveUsers()
    if (!data) {
      console.error("Failed to fetch active users data")
      return
    }
    setActiveUsers(data)
  }

  const fetchCategoryData = async () => {
    try {
      const data = await getAnalyticsCategory()
      if (!data) {
        console.error("Failed to fetch category data")
        return
      }

      const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]
      const transformedData = data.map((item, index) => ({
        name: item.name_category,
        value: item.value,
        color: colors[index % colors.length],
      }))

      setCategoryData(transformedData)
    } catch (error) {
      console.error("Error fetching category data:", error)
    }
  }

  const fetchEngagementData = async () => {
    try {
      const [postsData, commentsData, likesPostData, likesCommentsData] = await Promise.all([
        getTotalPosts(),
        getTotalComments(),
        getTotalLikesPost(),
        getTotalLikesComments(),
      ])

      if (!postsData?.data || !commentsData?.data || !likesPostData?.data || !likesCommentsData?.data) {
        console.error("Failed to fetch engagement data")
        return
      }

      // Combine all the data by month
      const combinedData = postsData.data.map((postItem) => {
        const commentItem = commentsData.data.find((c) => c.month === postItem.month) || { total_comments: 0 }
        const likesPostItem = likesPostData.data.find((l) => l.month === postItem.month) || { total_likes: 0 }
        const likesCommentItem = likesCommentsData.data.find((l) => l.month === postItem.month) || { total_likes: 0 }

        return {
          month: postItem.month,
          posts: postItem.total_posts,
          comments: commentItem.total_comments,
          likes: likesPostItem.total_likes + likesCommentItem.total_likes, // Combine likes from posts and comments
        }
      })

      // Reverse the array to show chronological order (Jan to Jul)
      setEngagementData(combinedData.reverse())
    } catch (error) {
      console.error("Error fetching engagement data:", error)
    }
  }

  useEffect(() => {
    fetchAnalytics()
    fetchTopPost()
    fetchReportedUsers()
    fetchActiveUser()
    fetchCategoryData()
    fetchEngagementData()
  }, [])

  const handelTotalPost = () => {
    if (analytics.current_month_posts && analytics.previous_month_posts) {
      const currentMonthPosts = analytics.current_month_posts
      const previousMonthPosts = analytics.previous_month_posts
      if (previousMonthPosts === 0) {
        return 100
      }
      return (((currentMonthPosts - previousMonthPosts) / previousMonthPosts) * 100).toFixed(1)
    }
    return 0
  }

  const handelTotalComment = () => {
    if (analytics.current_month_comments && analytics.previous_month_comments) {
      const currentMonthComments = analytics.current_month_comments
      const previousMonthComments = analytics.previous_month_comments
      if (previousMonthComments === 0) {
        return 100
      }
      return (((currentMonthComments - previousMonthComments) / previousMonthComments) * 100).toFixed(1)
    }
    return 0
  }

  const handelTotalUser = () => {
    if (analytics.current_month_users && analytics.previous_month_users) {
      const currentMonthUsers = analytics.current_month_users
      const previousMonthUsers = analytics.previous_month_users
      if (previousMonthUsers === 0) {
        return 100
      }
      return (((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100).toFixed(1)
    }
    return 0
  }

  const handelTotalReport = () => {
    if (analytics.current_month_reported && analytics.previous_month_reported) {
      const currentMonthReport = analytics.current_month_reported
      const previousMonthReport = analytics.previous_month_reported
      if (previousMonthReport === 0) {
        return 100
      }
      return (((currentMonthReport - previousMonthReport) / previousMonthReport) * 100).toFixed(1)
    }
    return 0
  }

  // Custom tooltip for bar chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  if (!analytics || !topPosts || !activeUsers) {
    return (
      <Layout adminName={localStorage.getItem("userName") || "Admin"}>
        <PageContainer title="Social Media Reports" description="Loading analytics data...">
          <div className="p-6">
            <p className="text-center text-muted-foreground">Loading analytics data, please wait...</p>
          </div>
        </PageContainer>
      </Layout>
    )
  }

  return (
      <Layout adminName={localStorage.getItem("userName") || "Admin"}>
      <PageContainer
        title="Social Media Reports"
        description="Monitor and manage your social media presence and engagement"
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button className="h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium bg-black text-white">
                Export Report
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                      <div className="text-sm font-medium">Total Posts</div>
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="text-2xl font-bold m-0">{analytics.current_month_posts.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground m-0 mt-1">
                        {handelTotalPost() > 0 ? (
                          <>
                            <span className="text-green-500">+</span>
                            <span className="text-green-500">{Math.abs(handelTotalPost())}% from last month</span>
                          </>
                        ) : handelTotalPost() < 0 ? (
                          <>
                            <span className="text-red-500">-</span>
                            <span className="text-red-500">{Math.abs(handelTotalPost())}% from last month</span>
                          </>
                        ) : (
                          <>
                            <span className="text-gray-500">0%</span> (No change from last month)
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="text-sm font-medium">Total Comments</div>
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="text-2xl font-bold">{analytics.current_month_comments.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground m-0 mt-1">
                        {handelTotalComment() > 0 ? (
                          <>
                            <span className="text-green-500">+</span>
                            <span className="text-green-500">{Math.abs(handelTotalComment())}% from last month</span>
                          </>
                        ) : handelTotalComment() < 0 ? (
                          <>
                            <span className="text-red-500">-</span>
                            <span className="text-red-500">{Math.abs(handelTotalComment())}% from last month</span>
                          </>
                        ) : (
                          <>
                            <span className="text-gray-500">0%</span> (No change from last month)
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="text-sm font-medium">Total Users</div>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="text-2xl font-bold">{analytics.current_month_users.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground mt-1 m-0">
                        {handelTotalUser() > 0 ? (
                          <>
                            <span className="text-green-500">+</span>
                            <span className="text-green-500">{Math.abs(handelTotalUser())}% from last month</span>
                          </>
                        ) : handelTotalUser() < 0 ? (
                          <>
                            <span className="text-red-500">-</span>
                            <span className="text-red-500">{Math.abs(handelTotalUser())}% from last month</span>
                          </>
                        ) : (
                          <>
                            <span className="text-gray-500">0%</span> (No change from last month)
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="text-sm font-medium">Reported Content</div>
                      <Flag className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="text-2xl font-bold">{analytics.current_month_reported.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground m-0 mt-1">
                        {handelTotalReport() > 0 ? (
                          <>
                            <span className="text-green-500">+</span>
                            <span className="text-green-500">{Math.abs(handelTotalReport())}% from last month</span>
                          </>
                        ) : handelTotalReport() < 0 ? (
                          <>
                            <span className="text-red-500">-</span>
                            <span className="text-red-500">{Math.abs(handelTotalReport())}% from last month</span>
                          </>
                        ) : (
                          <>
                            <span className="text-gray-500">0%</span> (No change from last month)
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-1">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="text-2xl font-semibold leading-none tracking-tight">Engagement Over Time</div>
                    <div className="text-sm text-muted-foreground">
                      Posts, comments, and likes over the past 7 months
                    </div>
                  </div>
                  <div className="p-6 h-80">
                    {engagementData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" stroke="#666" fontSize={12} />
                          <YAxis stroke="#666" fontSize={12} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="posts" fill="#3b82f6" name="Posts" radius={[2, 2, 0, 0]} />
                          <Bar dataKey="comments" fill="#10b981" name="Comments" radius={[2, 2, 0, 0]} />
                          <Bar dataKey="likes" fill="#f59e0b" name="Likes" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Loading engagement data...</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-1 grid grid-cols-1 gap-4">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                      <div className="text-2xl font-semibold leading-none tracking-tight">Content by Category</div>
                      <div className="text-sm text-muted-foreground">
                        Distribution of posts across different categories
                      </div>
                    </div>
                    <div className="p-6 h-[240px]">
                      {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={renderCustomizedLabel}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value, name) => [`${value} posts`, name]}
                              contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-gray-500">Loading category data...</p>
                        </div>
                      )}
                      {categoryData.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                          {categoryData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                              <span className="text-xs text-gray-600">{entry.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-1">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="text-2xl font-semibold leading-none tracking-tight">Top Performing Posts</div>
                    <div className="text-sm text-muted-foreground m-0">Posts with highest engagement</div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {topPosts.map((post) => (
                        <div key={post.id} className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-black m-0">{post.post_title}</p>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-3.5 w-3.5" />
                                <span>{post.likes_count}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-3.5 w-3.5" />
                                <span>{post.comments_count}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to="/socialMedia/posts">
                    <div className="p-6 pt-0">
                      <span className="text-center inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 w-full hover:bg-black hover:text-white">
                        View All Posts
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-1">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="text-2xl font-semibold leading-none tracking-tight">Reported by Users</div>
                    <div className="text-sm text-muted-foreground">Content flagged by community members</div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {reportedUser.map((report) => (
                        <div key={report.id} className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <div
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
                              >
                                {report.type}
                              </div>
                              <span className="text-sm font-medium">@{report.user_name}</span>
                            </div>
                            <div className="flex flex-col items-start text-sm text-muted-foreground">
                              <p className="text-sm text-muted-foreground mt-1">{report.title_or_content}</p>
                              <p className="text-xs text-muted-foreground mt-1">Reported by: @{report.reported_by}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <div
                              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
                            >
                              {report.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <a
                      href="/socialMedia/reports"
                      className="text-center inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 w-full hover:bg-black hover:text-white"
                    >
                      View All Reports
                    </a>
                  </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-1">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="text-2xl font-semibold leading-none tracking-tight">Active Users</div>
                    <div className="text-sm text-muted-foreground">Most active community members</div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {activeUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                              <img
                                src={NoImage || "/placeholder.svg"}
                                alt={user.user_name}
                                className="aspect-square h-full w-full"
                              />
                            </div>
                            <div className="flex flex-col items-start">
                              <p className="font-medium text-black m-0">{user.user_name}</p>
                              <p className="text-sm text-muted-foreground m-0">@{user.user_name}</p>
                            </div>
                          </div>
                          <div className="text-sm text-right">
                            <p className="text-black m-0">{user.post_count} posts</p>
                            <p className="text-muted-foreground m-0">{user.comment_count} comments</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to="/socialMedia/users">
                    <div className="p-6 pt-0">
                      <span className="text-center inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 w-full hover:bg-black hover:text-white">
                        View All Users
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </Layout>
  )
}
