$(document).ready(function () {
            getMessages();
        })

        function getMessages() {
//            $('#cards-box').empty();
            $.ajax({
                type: "GET",
                url: "/api/memos",
                data: {},
                success: function (response) {
                    for (let i = 0; i < response.length; i++) {
                        let post = response[i];
                        let id = post['id'];
                        let postName = post['postName'];
                        let userName = post['userName'];
                        let postText = post['postText'];
                        let createdAt = post['createdAt'];
                        addHTML(id, postName, userName, postText,createdAt);
                    }
                }
            });
        }

        function addHTML(id, postName, userName, postText, createdAt)
        {
            let tempHtml = makeMessage(id, postName, userName, postText, createdAt);
//            $('#cards-box').append(tempHtml);

            $('#tablebody').append(tempHtml);
        }

        function makeMessage(id, postName, userName, postText,createdAt, i) {
            return `<tr class="tableColor">
                                        <td scope="row" class="tbPostNum"> ${id} </td>
                                        <td scope="row" class="tbPostName" onclick="readPost(${id})"> ${postName} </td>
                                        <td scope="row" class="tbUserName"> ${userName} </td>
                                        <td scope="row" class="tbWriteDay"> ${createdAt} </td>
                                    </tr>`


//            `<div class="card">
//                        <!-- date/username 영역 -->
//                        <div>
//                            <tr class="date">
//                                작성 날짜 : ${createdAt}
//                            </tr>
//
//                            <tr class="user">
//                                작성자 : ${userName}
//                            </tr>
//
//                            <tr class="postname">
//                                ${postName}
//                            </tr>
//                        </div>
//                        <!-- 버튼 영역-->
//                        <div class="footer">
//                            <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')">
//                            <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')">
//                            <img id="${id}-submit" class="icon-end-edit" src="images/done.png" alt="" onclick="submitEdit('${id}')">
//                        </div>
//                    </div>`;
        }
        function isValidPostName(postName) {
                    if (postName == '') {
                        alert('글 제목을 입력해주세요');
                        return false;
                    }
                    if (postName.trim().length > 30) {
                        alert('글 제목을 공백 포함 30자 이하로 입력해주세요');
                        return false;
                    }
                    return true;
                }

        function isValidUserName(userName) {
                            if (userName == '') {
                                alert('유저 이름을 입력해주세요');
                                return false;
                            }
                            if (userName.trim().length > 10) {
                                alert('유저 이름을 공백 포함 10자 이하로 입력해주세요');
                                return false;
                            }
                            return true;
                        }



        function isValidContents(contents) {
            if (contents == '') {
                alert('내용을 입력해주세요');
                return false;
            }
            if (contents.trim().length > 140)
            {
                alert('내용을 공백 포함 140자 이하로 입력해주세요');
                return false;
            }
            return true;
        }

        function genRandomName(length) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                let number = Math.random() * charactersLength;
                let index = Math.floor(number);
                result += characters.charAt(index);
            }
            return result;
        }

        function writePost() {
            let postName = $('#postName').val();
            let userName = $('#userName').val();
            let postText = $('#contents').val();


            if (isValidPostName(postName) == false)
            {
                return;
            }
            else if (isValidUserName(userName) == false)
            {
                 return;
            }
            else if (isValidContents(postText) == false)
            {
                return;
            }

            let data = {'postName' : postName, 'userName': userName, 'postText': postText};

            $.ajax({
                type: "POST",
                url: "/api/memos",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (response) {
                    alert('메시지가 성공적으로 작성되었습니다.');
                    window.location.reload();
                }
            });
        }

        function editPost(id) {
            showEdits(id);
            let contents = $(`#${id}-contents`).text().trim();
            $(`#${id}-textarea`).val(contents);
        }

        function showEdits(id) {
            $(`#${id}-editarea`).show();
            $(`#${id}-submit`).show();
            $(`#${id}-delete`).show();

            $(`#${id}-contents`).hide();
            $(`#${id}-edit`).hide();
        }

        function hideEdits(id) {
            $(`#${id}-editarea`).hide();
            $(`#${id}-submit`).hide();
            $(`#${id}-delete`).hide();

            $(`#${id}-contents`).show();
            $(`#${id}-edit`).show();
        }

        function submitEdit(id) {
            let username = $(`#${id}-username`).text().trim();
            let contents = $(`#${id}-textarea`).val().trim();
            if (isValidContents(contents) == false) {
                return;
            }
            let data = {'username': username, 'contents': contents};

            $.ajax({
                type: "PUT",
                url: `/api/memos/${id}`,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (response) {
                    alert('메시지 변경에 성공하였습니다.');
                    window.location.reload();
                }
            });
        }

        function deleteOne(id) {
            $.ajax({
                type: "DELETE",
                url: `/api/memos/${id}`,
                success: function (response) {
                    alert('메시지 삭제에 성공하였습니다.');
                    window.location.reload();
                }
            })
        }

        function WriteBtn()
        {
//            $('#mainpage').addClass('hide');
            $('#writepage').addClass('show');
        }

        function cancle()
        {
//            $('#mainpage').removeClass('hide');
            $('#writepage').removeClass('show');
        }

        function readPost(index)
        {
            $.ajax({
                 type: "GET",
                 url: "/api/memos",
                 data: {},
                 success: function (response)
                    {
                        let aa = index - 1;

                        let post = response[aa];
                        let id = post['id'];
                        let postName = post['postName'];
                        let userName = post['userName'];
                        let postText = post['postText'];
                        let createdAt = post['createdAt'];

                        alert(id);
                        alert(postName);
                        alert(userName);
                        alert(postText);
                        alert(createdAt);

                    }
                 });
        }