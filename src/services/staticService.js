export default  class StaticService {
    /**
     *
     * @type {string}
     */
    static code = ""

    /**
     *
     * @type {string}
     */
    static name = "StaticService"

    /**
     *
     * @type {number}
     */
    static value = 0

    /**
     *
      * @param {string} code
     */
    static setCode = (code) => {
        this.code = code
    }
    /**
     *
     * @param {number} times
     * @param {string} reason
     */
    static multiplyValue = (times, reason) => {
        console.log("reason", reason)

        this.value *= times
    }


}