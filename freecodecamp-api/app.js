(function() {
    fetch(`https://buttercup-island.glitch.me/latest`)
    .then((data) => data.json()
    .then((data) => {
        retrieveTopicInfo(data)
        }))
    .catch((error) => console.log(error))
}())

const retrieveTopicInfo = (data) => {
    let topics = data.topic_list.topics
    let users  = data.users
    createPost(users, topics)
}

const createPost = (users, topics) => {
    //get users for all posts

    let allTopicInfo = []

    topics.forEach((topic) => {
        let topicPosters = []
        let topicInfo    = {posters: [], topic}
        topic.posters.forEach((poster) => {
            users.forEach((user) => {
                if(poster.user_id === user.id) {
                    topicPosters.push(user)
                }
            })
        })
        topicInfo.posters.push(topicPosters)
        topicInfo.topic = topic
        allTopicInfo.push(topicInfo)
    })
    displayPost(allTopicInfo)
}

function convertTime(time) {
    if(Number(time.match(/[0][0-9]*/))) {
        return  `${time.split("")[1]}m`
    } else {
        return `${time}m`
    }
}

const topicList = document.getElementById("topics")

const displayPost = (allTopicInfo) => {
    console.log(allTopicInfo)
    allTopicInfo.forEach((topic) => {
        const topicContainer = document.createElement("div")

        //create topic as headings 
        const titleHeader = document.createElement("p")
        const titleText   = document.createTextNode(topic.topic.title)
        const titleLink   = document.createElement("a")
        titleHeader.appendChild(titleText)
        titleLink.href    = `https://www.freecodecamp.org/forum/t/${topic.topic.slug}`
        titleLink.appendChild(titleHeader)
        const titleContainer = document.createElement("div")
        titleContainer.appendChild(titleLink)
        topicContainer.append(titleContainer)


        //create topic view counts
        const countHeader = document.createElement("p")
        const countText   = document.createTextNode(topic.topic.views)
        countHeader.appendChild(countText)
        const countContainer = document.createElement("div")
        countContainer.appendChild(countHeader)
        topicContainer.append(countContainer)

        //create reply counts 
        const replyHeader = document.createElement("p")
        const replyText   = document.createTextNode(topic.topic.reply_count)
        replyHeader.appendChild(replyText)
        const replyCountContainer = document.createElement("div")
        replyCountContainer.appendChild(replyHeader)
        topicContainer.append(replyCountContainer)

        // //create like counts
        // const likeHeader = document.createElement("p")
        // const likeNumber = document.createTextNode(topic.topic.like_count)
        // likeHeader.appendChild(likeNumber)
        // const likeCountContainer = document.createElement("div")
        // likeCountContainer.appendChild(likeHeader)
        // topicContainer.append(likeCountContainer)

        //create most recent post time
        const timeHeader = document.createElement("p")
        const time = topic.topic.last_posted_at.match(/[0-9][0-9]*:[0-9][0-9]*:[0-9][0-9]*/, "")[0].split(":")[1]
        const timeText   = document.createTextNode(convertTime(time))
        timeHeader.appendChild(timeText)
        const timeContainer = document.createElement("div")
        timeContainer.appendChild(timeHeader)
        topicContainer.append(timeContainer)

        // create topic commenters
        topic.posters.forEach((poster) => {
            const postUserContainer = document.createElement("div")
            poster.forEach((avatar) => {
                const userImgElement = document.createElement("img")
                const link           = document.createElement("a")
                link.href            = `https://www.freecodecamp.org/forum/u/${avatar.username}`
                const userImg        = `https://www.freecodecamp.org/forum${avatar.avatar_template.replace(/{size}/, 100)}`
                userImgElement.src   = userImg
                link.appendChild(userImgElement)
                postUserContainer.appendChild(link)
                
            })
            topicContainer.append(postUserContainer)
        })
        topicList.append(topicContainer)
    })

    console.log(allTopicInfo)
}



 