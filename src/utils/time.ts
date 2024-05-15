export const getTime = () => {
    let hours = new Date().getHours();
    if (hours <= 9) {

        return "早上好"

    } else if (hours <= 12) {

        return "上午好"

    }
    else if (hours <= 18) {

        return "下午好"

    } else {

        return "晚上好"
    }
}
export const getNowTime = () => {

    let date = new Date();
    // 年、月、日
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    // 时、分、秒
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return year + '年' + month + '月' + day + '日' + hour + '时' + minute + '分' + second + '秒';
}
