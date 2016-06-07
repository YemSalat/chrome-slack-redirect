document.addEventListener('click', (evt) => {
    let $this = evt.target;

    let onclickText = $this.getAttribute('onclick');
    let slackRedirCheck = 'slack-redir';
    let url = $this.getAttribute('data-referer-original-href');

    if (!url) return;

    if (onclickText && onclickText.match(slackRedirCheck)) {
        console.log(`Redirecting from Slack to ${ url }`);
        evt.stopPropagation();
        evt.preventDefault();

        let win = window.open(url, '_blank');
        win.focus();
    }
});
