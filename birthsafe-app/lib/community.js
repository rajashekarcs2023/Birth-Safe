import { supabase } from "./supabase"

// Get all community insights
export const getCommunityInsights = async () => {
  try {
    const { data, error } = await supabase
      .from("community_insights")
      .select(`
        *,
        profiles:user_id (name)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching community insights:", error)
    throw error
  }
}

// Get a specific community insight with replies
export const getCommunityInsight = async (insightId) => {
  try {
    // Get the insight
    const { data: insight, error: insightError } = await supabase
      .from("community_insights")
      .select(`
        *,
        profiles:user_id (name)
      `)
      .eq("id", insightId)
      .single()

    if (insightError) throw insightError

    // Get the replies
    const { data: replies, error: repliesError } = await supabase
      .from("community_replies")
      .select(`
        *,
        profiles:user_id (name)
      `)
      .eq("insight_id", insightId)
      .order("created_at", { ascending: true })

    if (repliesError) throw repliesError

    return {
      ...insight,
      replies: replies || [],
    }
  } catch (error) {
    console.error("Error fetching community insight:", error)
    throw error
  }
}

// Create a new community insight
export const createCommunityInsight = async (insightData) => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("community_insights")
      .insert([
        {
          user_id: userData.user.id,
          ...insightData,
        },
      ])
      .select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error creating community insight:", error)
    throw error
  }
}

// Reply to a community insight
export const replyToCommunityInsight = async (insightId, content, anonymous = false) => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    // Create the reply
    const { data: replyData, error: replyError } = await supabase
      .from("community_replies")
      .insert([
        {
          insight_id: insightId,
          user_id: userData.user.id,
          content,
          anonymous,
        },
      ])
      .select()

    if (replyError) throw replyError

    // Update the reply count on the insight
    const { error: updateError } = await supabase.rpc("increment_reply_count", {
      insight_id: insightId,
    })

    if (updateError) throw updateError

    return replyData[0]
  } catch (error) {
    console.error("Error replying to community insight:", error)
    throw error
  }
}

// Get pattern analysis data
export const getPatternAnalysisData = async () => {
  try {
    const { data, error } = await supabase
      .from("pattern_data")
      .select("*")
      .order("occurrence_count", { ascending: false })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching pattern analysis data:", error)
    throw error
  }
}

