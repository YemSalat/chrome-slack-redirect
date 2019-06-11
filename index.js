const styles = `
  <style id="cmStyles">
    .cm {
      position: fixed;
      padding-bottom: 24px;
      top: 10px;
      right: 24px;
      width: 40px;
      max-height: 100%;
      overflow-y: auto;
      opacity: 0.2;
      transition: 0.25s ease;
      z-index: 10000;
      text-align: center;
    }
    .cm:hover {
      opacity: 1;
    }
    .cm_li {
      border: 1px solid gray;
      border-bottom: none;
      font-size: 12px;
      background: #fff;
      cursor: pointer;
      line-height: 1.4;
    }
    .cm_li:last-child {
      border-bottom: 1px solid gray;
    }
    .cm_li.active, .cm_li:hover {
      background: #f7eecc;
    }
    .hs_fold {
      position: relative;
      top: 6px;
      cursor: pointer;
    }
    div.comment.__folded {
      background-color: #f7f7f7;
    }
  </style>
`

const $ = window.jQuery

$(document).ready((evt) => {
  $('#cmStyles').remove()
  $('.cm').remove()
  $('head').append(styles)
  $('body').append('<div class="cm" />')

  const cm = $('.cm')
  const comments = $('.comment')
  const res = []

  comments.each(function (index, el) {
    // folding
    const postId = el.id.replace('comment_', '')
    const subPosts = $(`#reply_comments_${postId}`)
    const subPostsAmount = $('li', subPosts).length
    if (subPostsAmount) {
      const $fold = $('<li class="inline-list__item inline-list__item_comment-nav"><a class="hs_fold">fold</a></li>')
      const $hsFold = $('.hs_fold', $fold)
      $fold.folded = false
      $hsFold.text(`fold (${subPostsAmount})`)
      $hsFold.click((event) => {
        const text = `${$fold.folded ? 'fold' : 'unfold'} (${subPostsAmount})`
        $(el).toggleClass('__folded')
        subPosts.toggle()
        $hsFold.text(text)
        $fold.folded = !$fold.folded
      })
      const $navbar = $('.inline-list_comment-nav', el)
      $navbar.prepend($fold)
    }
    // rating
    const rating = parseInt($(this).find('.voting-wjt__counter').text().replace('–', '-'), 10)
    if (rating && (rating > 2 || rating < -2)) {
      res.push({
        rating,
        el: this
      })
    }
  })

  res.sort(function (a, b) {
    if (a.rating < b.rating) return -1
    if (a.rating > b.rating) return 1
    return 0
  }).reverse()

  res.forEach(comment => {
    const li = $(`<div class="cm_li">${comment.rating}</div>`)
    li.click(() => {
      window.scrollTo(0, $(comment.el).offset().top)
    })
    cm.append(li)
  })

  $(document).on('click', '.cm_li', function () {
    $('.cm_li').removeClass('active')
    $(this).addClass('active')
  })
})
