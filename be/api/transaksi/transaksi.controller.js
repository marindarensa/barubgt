const models = require("../../models/index");
const transaksi = models.transaksi;
const detail_transaksi = models.detail_transaksi;
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const config = require("../auth/secret.json");
const { request, response } = require("express");

module.exports = {
    // controller GET All
    controllerGetAll: async (req, res) => {
        transaksi
            .findAll({
                include: [{ all: true, nested: true }],
            })

            .then((result) => {
                res.json({
                    success: 1,
                    data: result,
                });
            })
            .catch((error) => {
                res.json({
                    message: error.message,
                });
            });
    },
    // controller GET by ID
    controllerGetId: (req, res) => {
        const param = { id_transaksi: req.params.id_transaksi };
        transaksi
            .findOne({ where: param, include: [{ all: true, nested: true }] })
            .then((result) => {
                res.json({
                    success: 1,
                    data: result,
                });
            })
            .catch((error) => {
                res.json({
                    message: error.message,
                });
            });
    },
    // controller ADD
    controllerAdd: (req, res) => {
        console.log(req.body);
        let newTransaksi = {
            id_member: req.body.id_member,
            tgl: req.body.tgl,
            batas_waktu: req.body.batas_waktu,
            tgl_bayar: req.body.tgl_bayar,
            status: req.body.status,
            dibayar: req.body.dibayar,
            id_user: req.body.id_user,
            id_outlet: req.body.id_outlet,
        };

        transaksi
            .create(newTransaksi)
            .then((result) => {
                console.log("controlerAdd terpanggil .....");
                let lastID = result.id_transaksi
                detail = req.body.detail_transaksi
                detail.forEach(element => {
                element.id_transaksi = lastID
                });
                // proses insert detail_transaksi
                detail_transaksi
                    .bulkCreate(detail)
                    .then((result) => {
                        res.json({
                            message: `Data transaksi berhasil ditambahkan`,
                        });
                    })
                    .catch((error) => {
                        rres.json({
                            message: error.message,
                        });
                    });
            })
            .catch((error) => {
                return res.json({
                    message: error.message,
                });
            });
    },
    // controller EDIT
    controllerEdit: (req, res) => {
        const param = { id_transaksi: req.body.id_transaksi };
        const data = {
            id: req.body.id,
            id_member: req.body.id_member,
            tgl: req.body.tgl,
            batas_waktu: req.body.batas_waktu,
            tgl_bayar: req.body.tgl_bayar,
            status: req.body.status,
            dibayar: req.body.dibayar,
            id_user: req.body.id_user,
            id_outlet: req.body.id_outlet,
        };
        transaksi
            .update(data, { where: param })
            .then((result) => {
                res.json({
                    success: 1,
                    data: result,
                });
            })
            .catch((error) => {
                res.json({
                    message: error.message,
                });
            });
    },
    // controller DELETE
    controllerDelete: async(req, res) => {
        const param = { id_transaksi: req.params.id_transaksi };
        let result = await transaksi.findOne({where: param})
        transaksi
            .destroy({ where: param })
            .then((result) => {
                res.json({
                    success: 1,
                    data: result,
                    message: "Data Berhasil Dihapus",
                });
            })
            .catch((error) => {
                res.json({
                    message: error.message,
                });
            });
    },
};
