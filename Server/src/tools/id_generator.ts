class id_generator {
  uid(id:number) {
    return Date.now().toString(id) + Math.random().toString(id).substr(2);
  }
}
const uid_generator = new id_generator();
export default uid_generator.uid; 