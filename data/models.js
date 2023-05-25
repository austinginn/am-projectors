const models = [
    {
        "model": "DU72X",
        "brand": "Vivitek",
        "port": 23,
        "on": {
            "command": "op power.on\r\n",
            "responses": [
                { "value": "OP POWER.ON\r", "message": "Projector powering on." },
                { "value": "*Illegal format#\r", "message": "Projector is on." }
            ]
        },
        "off": {
            "command": "op power.off\r\n",
            "responses": [
                { "value": "OP POWER.OFF\r", "message": "Projector powering off." }
            ]
        },
        "status": {
            "command": "op status ?\r\n",
            "responses": [
                { "value": "OP STATUS = 0\r", "message": "Projector reset" },
                { "value": "OP STATUS = 1\r", "message": "Projector standby" },
                { "value": "OP STATUS = 2\r", "message": "Projector active" },
                { "value": "OP STATUS = 3\r", "message": "Projector cooling" },
                { "value": "OP STATUS = 4\r", "message": "Projector warming" },
                { "value": "OP STATUS = 5\r", "message": "Projector power up" }
            ]
        }
    }
]
module.exports = models;