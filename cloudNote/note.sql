/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50018
Source Host           : localhost:3306
Source Database       : note

Target Server Type    : MYSQL
Target Server Version : 50018
File Encoding         : 65001

Date: 2019-06-12 23:23:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userName` varchar(50) NOT NULL,
  `name` varchar(50) default NULL,
  `password` varchar(50) NOT NULL,
  `image` varchar(100) default NULL,
  `addr` varchar(999) NOT NULL,
  `account` varchar(200) default NULL,
  PRIMARY KEY  (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('test1', '吴柱豪', '123123', 'img/1.jpg', '0x7271bc4b8b1ec8e1b1dab5a22fb978422959d41a', '0x7a328321cfaffa9df40e1739E5ec1B264E9D105e');
INSERT INTO `user` VALUES ('test22', 'wo', '123123', 'img/1.jpg', '0x56a5696713f3876308fab63ec5ea9a2d56f2997a', '0x673A64775610674a6c8a2eC38C162C345E88306c');
INSERT INTO `user` VALUES ('wuzhuhao', '吴柱豪', '123123', 'img/1.jpg', '', '0x3B54b21474A7b43Bd5fc058b4B4719Cb43df69E4');
INSERT INTO `user` VALUES ('wuzhuhao1', '吴柱豪', '123123', 'img/1.jpg', '', '0x196b1039085585c44c14658EA64751CEbE3D1C89');
INSERT INTO `user` VALUES ('wuzhuhao123', '吴柱豪', '123123', 'img/1.jpg', '11111111', null);
INSERT INTO `user` VALUES ('wuzhuhao22', '吴柱豪', '123123', 'img/1.jpg', '', '0xdaC517DeBF7065ef6c7c6C07BD45403F4762B6fe');
INSERT INTO `user` VALUES ('wuzhuhao222', '吴柱豪', '123123', 'img/1.jpg', '', '0xDD07c039d9ea7fFb50a86D88e7488B134defAf17');
INSERT INTO `user` VALUES ('wuzhuhao2223', '吴柱豪', '123123', 'img/1.jpg', '', '0x63cbFbcB887f85cb39D773707F6D4B6495853F82');
INSERT INTO `user` VALUES ('wuzhuhao2226', '吴柱豪', '123123', 'img/1.jpg', '', '0xAB2BD1cdb349eDee1998c652021C6c1733067FAB');
INSERT INTO `user` VALUES ('wuzhuhao2227', '吴柱豪', '123123', 'img/1.jpg', '', '0x557e67bF94f5f63036E31fe1692f262B25D79aeD');
INSERT INTO `user` VALUES ('wuzhuhao2231', '吴柱豪', '123123', 'img/1.jpg', '', '0x13d903Ef3e9e01cC1142244276972f3ad9455ae9');
INSERT INTO `user` VALUES ('wuzhuhao2240', '吴柱豪', '123123', 'img/1.jpg', '0xb79f6e85102b73638509abbe633a94107621a3c3', '0x54f56b7aD006BBd622D38B2672D32bF562f781B7');
INSERT INTO `user` VALUES ('wuzhuhao888', '阿斯蒂芬', '123123', 'img/1.jpg', '0x0ee5aab3a84592d8c9c3641c46e69bd1787011ef', '0x9edAdA3746C0Eee2f79A70d28787F47aA4cE9B99');
INSERT INTO `user` VALUES ('wuzhuhao9991', '吴柱豪test', '123123', 'img/1.jpg', '0x3c4cf2a4a14c0103d5076f0a5d9da70c1db69287', '0x16eb527973234b35D31CeBD39e561dbF9F5f36DD');
INSERT INTO `user` VALUES ('wuzhuhao9999', '吴柱豪', '123123', 'img/1.jpg', '0xdd27a0fa3855694648160cf2ac0dd198c72dc8ad', '0x4d663605EBEe6Aa4870d06B8eB8BF77A7c2aCD4d');
INSERT INTO `user` VALUES ('wuzhuhao99990', '吴柱豪', '123123', 'img/1.jpg', '0x9d6d3d9a196dec3974c832438d29924d0947940f', '0xA1D459b3f6e83071D0a203395A8DBCaCA8deC505');
