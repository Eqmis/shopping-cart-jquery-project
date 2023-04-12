$(function () {
    // 全选
    $('.checkAll').change(function () {
        $(':checkbox').not(this).prop('checked', this.checked)
        setTotal()
    })
    // 单选
    $('.checkItem').change(function () {
        setTotal()
        isAllChecked()
    })
    // 改变数量
    $('.decr').click(function (e) {
        e.preventDefault();
        const newNumber = +$(this).nextAll('input').val() - 1
        const dom = $(this).nextAll('input')
        changeNumber(newNumber, dom)
    })
    $('.incr').click(function (e) {
        e.preventDefault();
        const newNumber = +$(this).prevAll('input').val() + 1
        const dom = $(this).prevAll('input')
        changeNumber(newNumber, dom)
    })
    $(':input.txt').blur(function () {
        changeNumber(+$(this).val(), $(this))
    })
    // 单商品删除
    $('.item .del').click(function(e){
        e.preventDefault()
        delGoods($(this).parents('.item'))
    })
    // 清空购物车
    $('.footer .operation .clearAll').click(function(e){
        e.preventDefault()
        delGoods($('.item'))
    })

    // 删除选中商品
    $('.footer .operation .delChecked').click(function(e){
        e.preventDefault()
        delGoods($('.item .checkItem:checked').parents('.item'))
    })


    // 判断全选状态
    function isAllChecked() {
        const result =  $('.checkItem').length === 0 ? false : $('.checkItem').toArray().every(check => check.checked)
        $('.checkAll').prop('checked', result)
    }
    // 总价合计
    function setTotal() {
        let sum = 0
        const checked = $(':checked.checkItem')
        checked.each(function (i, dom) {
            sum += +$(dom).parents('.item').find('.sum em').text().replace('￥', '')
        })
        // 设置结算金额、选中商品数量
        $('.footer .nums em').text(checked.length)
        $('.footer .sums em').text(`￥${sum.toFixed(2)}`)
    }
    // 改变数值
    function changeNumber(newNumber, dom) {
        if (newNumber <= 0 || isNaN(newNumber)) {
            newNumber = 1
        }
        dom.val(newNumber)
        const price = +dom.parents('.item').find('.price em').text().replace('￥', '')
        dom.parents('.item').find('.sum em').text(`￥${(price * newNumber).toFixed(2)}`)
        if (dom.parents('.item').find('.checkItem').prop('checked')) {
            setTotal()
        }
    }
    // 删除指定商品
    function delGoods(...args){
        args.forEach(item=>{
            item.remove()
        })
        isAllChecked()
        setTotal()
    }
})