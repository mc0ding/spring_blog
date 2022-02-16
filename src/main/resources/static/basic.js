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

function openClose() {
    if ($("#area-write").css("display") == "block") {
        $("#area-write").hide();
        $("#btn-post-box").text("포스팅 박스 열기");
    } else {
        $("#area-write").show();
        $("#btn-post-box").text("포스팅 박스 닫기");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 여기서부터 코드를 작성해주시면 됩니다.

$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
    getList();
})

// 메모를 불러와서 보여줍니다.
function getList() {
    // 1. 기존 메모 내용을 지웁니다.
    $('#tables-box').empty();
    // 2. 메모 목록을 불러와서 HTML로 붙입니다.
    $.ajax({
        type: 'GET',
        url: '/api/posts-list',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let post = response[i];
                let id = post.id;
                let username = post.username;
                let title = post.title;
                let createdAt = post.createdAt;
                addListHTML(id, username, title, createdAt)
            }
        }
    })
}

// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addListHTML(id, username, title, createdAt) {
    // 1. HTML 태그를 만듭니다.
    let tempHtml = `<tr>
                        <td id="${id}-username" class="td username" onclick = "window.location.href = 'post.html?id=' + ${id}">${username}</td>
                        <td id="${id}-title" class="td title text" onclick = "window.location.href = 'post.html?id=' + ${id}">${title}</td>
                        <td class="td metadata date" onclick = "window.location.href = 'post.html?id=' + ${id}">${createdAt}</td>
                        <td id="${id}-delete" class="td footer"><img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')"></td>
                    </tr>`;
    // 2. #cards-box 에 HTML을 붙인다.
    $('#tables-box').append(tempHtml);
}

// 메모를 생성합니다.
function writePost() {
    // 1. 작성한 메모를 불러옵니다.
    let title = $('#title').val();
    let username = $('#username').val();
    let contents = $('#contents').val();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidTitle(title) == false) {
        return;
    } if (isValidUsername(username) == false) {
        return;
    } if (isValidContents(contents) == false) {
        return;
    }
    // 4. 전달할 data JSON으로 만듭니다.
    let data = {'title': title, 'username': username, 'contents': contents};
    // 5. POST /api/posts 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: "/api/posts",
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지가 성공적으로 작성되었습니다.');
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
            window.location.reload();
        }
    })
}