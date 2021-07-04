class Utils {
  public static getTablePosition(level: number): number[] {
    return Table.TABLE_POSITIONS[level - 1];
  }

  public static processInput(text: string, keyCode: number, key: string): string {
    if (keyCode === BACKSPACE) {
      if (text.length > 0) {
        text = text.substring(0, text.length - 1);
      }
    } else if (keyCode === DELETE) {
      text = '';
    } else if (keyCode !== SHIFT && keyCode !== CONTROL && keyCode !== ALT) {
      text = text + key;
    }
    return text;
  }

  public static mouseOverCircle(mouseX: number, mouseY: number, x: number, y: number, diameter: number): boolean {
    return dist(mouseX, mouseY, x, y) < diameter * 0.5;
  }

  public static mouseOverRect(mouseX: number, mouseY: number, x: number, y: number, w: number, h: number): boolean {
    return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
  }

  public static isNullOrUndefined(obj: any): boolean {
    return obj !== null && obj !== undefined;
  }
  public static getRandom<T>(list: T[]): T {
    if (!Array.isArray(list) || !list.length) {
      return null;
    }
    const randomPos: number = Utils.getRandomPosition(list.length);
    return list[randomPos];
  }

  // We must do the +1 so they all have the same chance. Otherwise, the last one would have 1/2 chances.
  // (int)Math.floor(x) will always give the int closest to the lower.
  public static getRandomPosition(size: number): number {
    return Math.floor(random(0, size));
  }

  /* Returns -1 or 1 */
  public static randomSignum(): number {
    return Math.round(random(2) * 2 - 1);
  }

  public static randomBoolean(): boolean {
    return random(1) >= 0.5;
  }
}
