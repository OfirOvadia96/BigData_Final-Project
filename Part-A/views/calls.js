function initSocket() {
    //socket is global
    socket = io.connect();
    alert("connected");
}

//Send to socket the current waiting calls
function sendMessage(total) {
    socket.emit("totalWaitingCalls", { totalWaiting: total });
}

// const randomPerson = () => {
//     connection.connect(function(err) {
//         if (err) throw err;
//         con.query("SELECT * FROM users ORDER BY RAND() LIMIT 1", function (err, result, fields) {
//             if (err) throw err;
//             console.log(result);
//         });
//     });
// }
var countCalls = 0;

//Show the data on screen
function NewCall() {

    countCalls++;
    var counter = document.querySelector('.counter');
    counter.innerHTML = countCalls;

    var tr = document.getElementById('openConversations').insertRow();
    var cID = tr.insertCell(0);
    var cFirstName = tr.insertCell(1);
    var cLastName = tr.insertCell(2);
    var cPhone = tr.insertCell(3);
    var cCity = tr.insertCell(4);
    var cGender = tr.insertCell(5);
    var cAge = tr.insertCell(6);
    var cPrevCalls = tr.insertCell(7);
    var cStart = tr.insertCell(8);
    var cProduct = tr.insertCell(9);
    var cTopic = tr.insertCell(10);
    var cEnd = tr.insertCell(11);

    const date = Date.now();
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' })
    const [{ value: month }, , { value: day }, , { value: year }, , { value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(date)

    cID.innerHTML = "<div>d</div>";
    cFirstName.innerHTML = "<div>d</div>";
    cLastName.innerHTML = "<div>d</div>";
    cPhone.innerHTML = "<div>d</div>";
    cCity.innerHTML = "<div>d</div>";
    cGender.innerHTML = "<div>d</div>";
    cAge.innerHTML = "<div>d</div>";
    cPrevCalls.innerHTML = "<div>d</div>";
    cStart.innerHTML = "<div id='" + date + "''>" + `${day}-${month}-${year} ,${hour}:${minute}` + "</div>";
    cProduct.innerHTML = "<select><option value='internet'>אינטרנט ביתי</option><option value='cables'>כבלים</option><option value='cellular'>סלולרי</option><option value='all'>כולם</option></select>";
    cTopic.innerHTML = "<select><option value='join'>הצטרפות</option><option value='service'>שירות</option><option value='complaint'>תלונה</option><option value='leave'>בקשת ניתוק</option></select>";
    cEnd.innerHTML = "<button onclick='reportEndCall(this.parentNode.parentNode)'>סיום</button>";
}

function reportEndCall(row) {
    
    var totalCalls = parseInt(document.getElementById("total").value) || 0;
    if (parseInt(totalCalls) > 0) {
        document.getElementById("total").value = (--totalCalls) + "";
    }

    var message = {};
    message.id = row.cells[0].getElementsByTagName('div')[0].id;
    message.firstName = row.cells[1].getElementsByTagName('div')[0].id;
    message.lastName = row.cells[2].getElementsByTagName('div')[0].id;
    message.phone = row.cells[3].getElementsByTagName('div')[0].id;
    message.city = row.cells[4].getElementsByTagName('div')[0].value;
    message.gender = row.cells[5].getElementsByTagName('div')[0].value;
    message.age = row.cells[6].getElementsByTagName('div')[0].value;
    message.prevCalls = row.cells[7].getElementsByTagName('div')[0].value;
    message.totalTime = (parseInt(Date.now()) - parseInt(message.id)) / 1000; // seconds
    message.product = (row.cells[9].getElementsByTagName('select')[0].value || 18);
    message.topic = (row.cells[10].getElementsByTagName('select')[0].value || 18);
    
    //Send to socket the call details
    socket.emit("callDetails", message);
    deleteRow(row);
}

//delete row after push 'end'
function deleteRow(row) {
    var i = row.rowIndex;
    document.getElementById('openConversations').deleteRow(i);

    countCalls--;
    var counter = document.querySelector('.counter');
    counter.innerHTML = countCalls;
}