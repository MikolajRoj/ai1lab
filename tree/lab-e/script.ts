const msg: string = "Hello!";
alert(msg);

function changeStyle(styleName: string) {
    const link: HTMLLinkElement | null = document.getElementById('dynamic-style') as HTMLLinkElement;
    if (link) {
        link.href = `styles/${styleName}.css`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    type ButtonMap = {
        [key: string]: string;
    };

    const buttons: ButtonMap = {
        'style-respon': 'style_respon',
        'style-other': 'style_other',
        'style-1': 'style_1',
        'style-2': 'style_2',
        'style-3': 'style_3'
    };

    Object.keys(buttons).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button?.addEventListener('click', () => changeStyle(buttons[buttonId]));
    });
});