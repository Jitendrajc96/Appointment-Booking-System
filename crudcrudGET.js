<html>
    <body>
        <h3>WELLCOME TO !!</h3>
        <h4>APPOINTMENT BOOKING SYSTEM</h4>

        <form onsubmit="saveToLocalStorage(event)" >
            <fieldset style="width:60%;"> 
                <legend>Personal Details</legend>
            <label> Name:</label>
            <input id='username' type="text" name="username"  required/><br><br>
            <label> EmailId:</label>
            <input id='email' type="email" name="emailId"  required/><br><br>
            <label> Phone Number:</label>
            <input id='phonenumber' type="tel" name="phonenumber" /><br><br>
            <button> Submit </button><br><br>
            <fieldset>
        </form>
        <ul id='listOfitems'></ul>
        <ul id='listOfUsers'></ul>
    </body>

        <script>
            function saveToLocalStorage(event) {
                event.preventDefault();
                const name = event.target.username.value;
                const email = event.target.emailId.value;
                const phonenumber = event.target.phonenumber.value;
                // localStorage.setItem('name', name);
                // localStorage.setItem('email', email);
                // localStorage.setItem('phonenumber', phonenumber)
                const obj = {
                    name : name,  
                    email : email,
                    phonenumber: phonenumber
                    //values can be skipped
                }

                axios.post("https://crudcrud.com/api/f619a5973f624c4589a49f32fde9d47f/appointmentSystemData",obj)
                .then((response)=>{
                    //console.log(response);
                    showNewUserOnScreen(response.data)
                })
                .catch((error)=>{
                    document.body.innerHTML += "<h4> SOMETHING WENT WRONG </h4>";
                    console.log(error);
                })
                //localStorage.setItem(obj.email, JSON.stringify(obj))
                //showNewUserOnScreen(obj)
            }
             window.addEventListener("DOMContentLoaded", () => {
                const data = axios.get("https://crudcrud.com/api/f619a5973f624c4589a49f32fde9d47f/appointmentSystemData")
                .then((response)=>{
                    console.log(response);
                    for(var i=0; i<response.data.length; i++){
                        showNewUsersOnScreen(response.data[i])//data will be read from here
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
                  console.log(data);
                //line 63 to 70 commented because we are not reading data from the local storage.
                // const localStorageObj = localStorage;
                // const localstoragekeys  = Object.keys(localStorageObj)

                // for(var i =0; i< localstoragekeys.length; i++){
                //     const key = localstoragekeys[i]
                //     const userDetailsString = localStorageObj[key];
                //     const userDetailsObj = JSON.parse(userDetailsString);
                //     showNewUserOnScreen(userDetailsObj)
                // }
            })
            function showNewUserOnScreen(user){   
                const parentNode = document.getElementById('listOfUsers');
                const childHTML = `<li id=${user.email}> ${user.name} - ${user.email}
                                        <button onclick=deleteUser('${user.email}')> Delete </button>
                                        <button onclick=editUserDetails('${user.email}','${user.name}','${user.phonenumber}')> Edit </button>
                                     </li>`
                parentNode.innerHTML += childHTML;
            }

            //edit user details 
            function editUserdetails(emailId, name, phonenumber){
            	document.getElementById('email').value=emailId;
            	document.getElementById('username').value=name;
            	document.getElementById('phonenumber').value=phonenumber;

            	deleteUser(emailId)
            }



            function deleteUser(emailId){  //delete user from local storage 
                console.log(emailId)
                localStorage.removeItem(emailId);
                removeUserFromScreen(emailId);

            }
            function removeUserFromScreen(emailId){   //delete user details from the screen 
                const parentNode = document.getElementById('listOfUsers');
                const childNodeToBeDeleted = document.getElementById(emailId);
                if(childNodeToBeDeleted){
                parentNode.removeChild(childNodeToBeDeleted);
            }
            }

        </script>
    
</html>
