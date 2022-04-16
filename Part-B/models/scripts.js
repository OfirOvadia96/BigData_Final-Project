// // Learn Fetch API In 6 Minutes
// // https://www.youtube.com/watch?v=cuEtnrL9-H0&ab_channel=WebDevSimplified

// // post data
// fetch('https://reqres.in/api/users', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: 'User 1'
//         })
//     }).then(res => {
//         return res.json()
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log('ERROR'))


// // get data
// fetch('https://reqres.in/api/users')
//     .then(res => {
//         if (res.ok) {
//             console.log('SUCCESS')
//             res.json().then(data => console.log(data))
//         } else {
//             console.log('Not Sucessful')
//         }
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log('ERROR'))