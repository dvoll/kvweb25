import Accordion from './modules/accordion';

document.addEventListener('DOMContentLoaded', () => {
    /** @type { HTMLTemplateElement | null } */
    const template = document.querySelector('#svg-template');
    if (!template) return;

    const paragraphsWithLinkIcon = document.querySelectorAll('.kvweb25-icon');
    paragraphsWithLinkIcon.forEach((paragraph) => {
        const result = paragraph.className.match(/kvweb25-icon-(\S*)/);
        const iconName = result && result[1] ? result[1] : 'arrow-long-right';
        const templateClone = /** @type { HTMLElement } */ (template.content.cloneNode(true));
        const use = /** @type { SVGUseElement } */ (templateClone.querySelector('use'));

        use.setAttribute('href', '#' + iconName);
        paragraph.querySelectorAll('a').forEach((link) => link.append(templateClone));
    });

    requestAnimationFrame(() => {
        document.querySelectorAll('.wp-block-details').forEach((el) => {
            new Accordion(/** @type {HTMLDetailsElement} */ (el));
        });
    });
});
