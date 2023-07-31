export interface IBaseComponent {
  tag?: keyof HTMLElementTagNameMap;
  parent?: HTMLElement;
  className?: string[];
  text?: string;
  id?: string;
}

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  public readonly element: T;

  constructor({ tag = 'div', parent, className = [], text = '', id }: IBaseComponent) {
    this.element = document.createElement(tag) as T;
    this.element.classList.add(...className);
    if (parent) {
      parent.append(this.element);
    }
    if (id) {
      this.element.id = id;
    }
    this.element.textContent = text;
  }

  public getNode(): T {
    return this.element;
  }

  public addClass(...classes: string[]): void {
    this.element.classList.add(...classes);
  }

  public removeClass(...classes: string[]): void {
    this.element.classList.remove(...classes);
  }

  public getClassName(): string {
    return this.element.className;
  }

  public addData(name: string, data: string): void {
    this.element.setAttribute(`data-${name}`, data);
  }

  public setTextContent(text: string): void {
    this.element.textContent = text;
  }

  public setInnerHTML(value: string): void {
    this.element.innerHTML = value;
  }

  public setAttribute(atribute: string, value: string): void {
    this.element.setAttribute(atribute, value);
  }

  public removeAttribute(attribute: string): void {
    this.element.removeAttribute(attribute);
  }

  public setId(id: string): void {
    this.element.id = id;
  }

  public destroy(): void {
    this.element.remove();
  }

  public stylize<K extends keyof CSSStyleDeclaration>(
    prop: K,
    value: CSSStyleDeclaration[K],
  ): void {
    this.element.style[prop] = value;
  }

  public addEvent<K extends keyof HTMLElementEventMap>(
    event: K,
    func: (e: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.element.addEventListener(event, func, options);
  }

  public removeEvent<K extends keyof HTMLElementEventMap>(
    event: K,
    func: (e: HTMLElementEventMap[K]) => void,
  ): void {
    this.element.removeEventListener(event, func);
  }

  public insertChildren(...children: BaseComponent[]): void {
    children.forEach((component) => {
      this.element.append(component.getNode());
    });
  }

  public replaceChildren(...components: BaseComponent[]): void {
    const elements = components.map((item) => item.getNode());
    this.element.replaceChildren(...elements);
  }

  public getDOMRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}
