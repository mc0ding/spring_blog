function isValidUsername(contents) {
    if (contents == '') {
        alert('이름을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 20) {
        alert('공백 포함 20자 이하로 입력해주세요');
        return false;
    }
    return true;
}

function isValidTitle(contents) {
    if (contents == '') {
        alert('제목을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 100) {
        alert('공백 포함 100자 이하로 입력해주세요');
        return false;
    }
    return true;
}

function isValidContents(contents) {
    if (contents == '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 500) {
        alert('공백 포함 500자 이하로 입력해주세요');
        return false;
    }
    return true;
}

function isValidComment(contents) {
    if (contents == '') {
        alert('댓글을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 100) {
        alert('공백 포함 100자 이하로 입력해주세요');
        return false;
    }
    return true;
}

$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
    data = window.location.search;
    id = data.split('=')[1]
    readOne(id)
})

function readOne(id) {
    // 1. 메모 목록을 불러와서 HTML로 붙입니다.
    $.ajax({
        type: 'GET',
        url: `/api/posts/${id}`,
        success: function (response) {
            let post = response;
            let id = post.id;
            let username = post.username;
            let title = post.title;
            let contents = post.contents;
            let modifiedAt = post.modifiedAt;
            let comments = post.comments;

            addPostHTML(id, username, title, contents, modifiedAt)
            addPostHTML2(id, comments)
        }
    })
}

// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addPostHTML(id, username, title, contents, modifiedAt) {
    // 1. HTML 태그를 만듭니다.

    let tempHtml1 = `<div class="card">
                        <!-- date/username 영역 -->
                        <div class="metadata">
                            <div class="date">
                                ${modifiedAt}
                            </div>
                        </div>
                        <div class = contents-head>
                            <span id="${id}-username" class="username">
                                ${username}
                            </span>
                            <span id="${id}-title" class="title">
                                ${title}
                            </span>
                                                        
                            <span id="${id}-edittitlearea" class="edit">
                                <textarea id="${id}-titlearea" class="title-edit" name="" id="" cols="30" rows="5"></textarea>
                            </span>
                            <span id="${id}-editnamearea" class="edit">
                                <textarea id="${id}-namearea" class="name-edit" name="" id="" cols="30" rows="5"></textarea>
                            </span>
                            
                        </div>
                        <!-- contents 조회/수정 영역-->
                        <div class="contents">
                            <div id="${id}-contents" class="text">
                                ${contents}
                            </div>
                            <div id="${id}-editcontentsarea" class="edit">
                                <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                        <!-- 버튼 영역-->
                        <div class="footer">
                            <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')">
                            <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')">
                            <img id="${id}-submit" class="icon-end-edit" src="images/done.png" alt="" onclick="submitEdit('${id}')">
                        </div>
                    </div>
                    
                    <div class="area-write" id="area-write">
                        <textarea class="comment-field" placeholder="내용을 입력해주세요" name="contents" id="contents" cols="30"
                                  rows="10"></textarea>
                        <img src="images/send.png" alt="" onclick="writeComment('${id}')">
                    </div>`;
    // 2. #cards-box 에 HTML을 붙인다.
    $('#cards-box').append(tempHtml1);
}

function addPostHTML2(id, comments) {
    for (i=(comments.length - 1); i>-1; i--) {
        let commentsList = comments[i]
        let comment = commentsList['content']
        let c_id = commentsList['id']

        temp_html = `<div class="comment-card">
                        <!-- contents 조회/수정 영역-->
                        <div class="comment-contents">
                            <div id="${c_id}-comment-contents" class="comment-text">
                                ${comment}
                            </div>
                            <div id="${c_id}-editcommentarea" class="edit">
                                <textarea id="${c_id}-commentarea" class="comment-edit" name="" id="" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                        <!-- 버튼 영역-->
                        <div class="comment-footer">
                            <img id="${id}-commenteditbtn" class="icon-start-edit" src="images/edit.png" alt="" onclick="editComment('${c_id}')">
                            <img id="${id}-commentdelete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteComment('${c_id}')">
                            <img id="${id}-commentsubmit" class="icon-end-edit" src="images/done.png" alt="" onclick="commentSubmitEdit('${c_id}')">
                        </div>
                    </div>`
        $('#comments-box').append(temp_html)
    }
}

function editPost(id) {
    showEdits(id);
    let title = $(`#${id}-title`).text().trim();
    let username = $(`#${id}-username`).text().trim();
    let contents = $(`#${id}-contents`).text().trim();
    $(`#${id}-titlearea`).val(title);
    $(`#${id}-namearea`).val(username);
    $(`#${id}-textarea`).val(contents);
}

function showEdits(id) {
    $(`#${id}-editnamearea`).show();
    $(`#${id}-edittitlearea`).show();
    $(`#${id}-editcontentsarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-username`).hide();
    $(`#${id}-title`).hide();
    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

// 메모를 수정합니다.
function submitEdit(id) {
    // 1. 작성 대상 메모의 username과 contents 를 확인합니다.
    let username = $(`#${id}-namearea`).val().trim();
    let title = $(`#${id}-titlearea`).val().trim();
    let contents = $(`#${id}-textarea`).val().trim();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidUsername(username) == false) {
        return;
    } if (isValidTitle(title) == false) {
        return;
    } if (isValidContents(contents) == false) {
        return;
    }
    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'title': title, 'username': username, 'contents': contents};
    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/posts/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지 변경에 성공하였습니다.');
            window.location.reload();
        }
    });
}

// 메모를 삭제합니다.
function deleteOne(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/posts/${id}`,
        success: function (response) {
            alert('메시지 삭제에 성공하였습니다.');
            window.location.href="index.html";
        }
    })
}
/////// 댓글 함수

// 댓글 작성 함수
function writeComment(id) {
    // 1. 작성한 댓글을 불러옵니다.
    let contents = $('#contents').val();
    // 2. 작성한 댓글이 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidTitle(contents) == false) {
        return;
    }
    // 4. 전달할 data JSON으로 만듭니다.
    let data = {'commentContents': contents};
    // 5. POST /api/posts 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: `/api/comments/${id}`,
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지가 성공적으로 작성되었습니다.');
            window.location.reload();
        }
    });
}

function editComment(c_id) {
    showCommentEdits(c_id);
    let contents = $(`#${c_id}-comment-contents`).text().trim();
    $(`#${c_id}-commentarea`).val(contents);
}

function showCommentEdits(c_id) {
    $(`#${c_id}-editcommentarea`).show();
    $(`#${c_id}-commentsubmit`).show();
    $(`#${c_id}-commentdelete`).show();

    $(`#${c_id}-comment-contents`).hide();
    $(`#${c_id}-commenteditbtn`).hide();
}

function commentSubmitEdit(c_id) {
    // 1. 작성 대상 메모의 username과 contents 를 확인합니다.
    let contents = $(`#${c_id}-commentarea`).val().trim();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidComment(contents) == false) {
        return;
    }
    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'commentContents': contents};
    // 4. PUT /api/memos/{c_id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/comments/${c_id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지 변경에 성공하였습니다.');
            window.location.reload();
        }
    });
}

function deleteComment(c_id) {
    $.ajax({
        type: "DELETE",
        url: `/api/comments/${c_id}`,
        success: function (response) {
            alert('메시지 삭제에 성공하였습니다.');
            window.location.reload();
        }
    })
}
