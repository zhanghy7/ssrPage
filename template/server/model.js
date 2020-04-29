// 组装数据对象
export default class Model {
  static async getApi(prams) {
    let data = await API.partner.getApi(prams);
    return data;
  }
}
