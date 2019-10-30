class SessionController {
    static async login(req, res) {
        return res.json({ message: 'ok' });
    }
}

export default new SessionController();
