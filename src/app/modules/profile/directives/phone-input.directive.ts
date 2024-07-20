import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appPhoneInput]'
})
export class PhoneInputDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Home',
      'End',
    ];

    if (allowedKeys.indexOf(event.key) !== -1) {
      return; // Разрешенные клавиши, разрешаем их
    }

    const pattern = /^[0-9+]$/; // Регулярное выражение для проверки символов
    const inputChar = event.key; // Получаем нажатый символ
    const currentValue = this.el.nativeElement.value; // Получаем текущее значение поля ввода

    // Проверяем, есть ли уже символ '+' в текущем значении
    const plusExists = currentValue.includes('+');

    // Если символ '+' существует, и мы пытаемся ввести его снова, блокируем ввод
    if (inputChar === '+' && plusExists) {
      event.preventDefault();
      return;
    }

    // Проводим проверку на соответствие шаблону
    if (!pattern.test(inputChar)) {
      event.preventDefault(); // Блокируем ввод, если символ не соответствует шаблону
    }
  }

}
