"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
test('should return the get of health api response', () => {
    const req = {};
    const res = {
        json: jest.fn()
    };
    _1.get(req, res);
    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toMatchSnapshot();
});
