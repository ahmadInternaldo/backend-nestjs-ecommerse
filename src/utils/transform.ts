export class Transform {
  constructor(
    private message: any,
    private success: string = '',
    private error: string = '',
  ) {}

  transform() {
    return {
      message: this.message,
      success: this.success,
      error: this.error,
    };
  }
}
