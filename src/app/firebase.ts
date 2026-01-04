class FirebaseConnection {
  private constructor() {}

  static #inst: FirebaseConnection;

  public static get inst(): FirebaseConnection {
    if (!FirebaseConnection.#inst)
      FirebaseConnection.#inst = new FirebaseConnection();
    return FirebaseConnection.#inst;
  }
}
