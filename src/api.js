import uuid from "uuid/v4";

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

export default {
  async createMessage(text) {
    await wait(500);

    return {
      id: uuid(),
      text
    }
  },
  async createConversation(text) {
    await wait(500);

    return {
      id: uuid(),
      messages: [
        {
          id: uuid(),
          text
        }
      ]
    }
  }
}