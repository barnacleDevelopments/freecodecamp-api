(function() {
    fetch(`https://buttercup-island.glitch.me/latest`)
    .then((data) => data.json())
    .then((data) => {
        retrieveCommentInfo(data)
        })
    .catch((error) => console.log(error))
}())

const retrieveCommentInfo = (data) => {
    const arr = {}
    arr.topics = data.topic_list.topics
    arr.users  = data.users
    displayCommentInfo(arr)
}

const displayCommentInfo = (arr) => {
    const titles = arr.topics.map((topic) => {
        return topic.title
    })
    const users = arr.users.map((user) => {
        return user
    })

    console.log(titles)
    console.log(users)

    titles.forEach((title) => {
        const titleHeader
    })
}
