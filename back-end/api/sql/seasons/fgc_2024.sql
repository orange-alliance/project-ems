ALTER TABLE "ranking" ADD COLUMN rankingScore INT;
ALTER TABLE "ranking" ADD COLUMN highestScore INT;
ALTER TABLE "ranking" ADD COLUMN foodSecuredPoints INT;

ALTER TABLE "match_detail" ADD COLUMN redResevoirConserved;
ALTER TABLE "match_detail" ADD COLUMN redFoodProduced;
ALTER TABLE "match_detail" ADD COLUMN redRobotOneParked;
ALTER TABLE "match_detail" ADD COLUMN redRobotTwoParked;
ALTER TABLE "match_detail" ADD COLUMN redRobotThreeParked;
ALTER TABLE "match_detail" ADD COLUMN redCw1 INT;
ALTER TABLE "match_detail" ADD COLUMN redCw2 INT;
ALTER TABLE "match_detail" ADD COLUMN redCw3 INT;
ALTER TABLE "match_detail" ADD COLUMN redCw4 INT;
ALTER TABLE "match_detail" ADD COLUMN redCw5 INT;
ALTER TABLE "match_detail" ADD COLUMN redCw6 INT;
ALTER TABLE "match_detail" ADD COLUMN redEc1 INT;
ALTER TABLE "match_detail" ADD COLUMN redEc2 INT;
ALTER TABLE "match_detail" ADD COLUMN redEc3 INT;
ALTER TABLE "match_detail" ADD COLUMN redEc4 INT;
ALTER TABLE "match_detail" ADD COLUMN redEc5 INT;
ALTER TABLE "match_detail" ADD COLUMN redEc6 INT;

ALTER TABLE "match_detail" ADD COLUMN blueResevoirConserved;
ALTER TABLE "match_detail" ADD COLUMN blueFoodProduced;
ALTER TABLE "match_detail" ADD COLUMN blueRobotOneParked;
ALTER TABLE "match_detail" ADD COLUMN blueRobotTwoParked;
ALTER TABLE "match_detail" ADD COLUMN blueRobotThreeParked;
ALTER TABLE "match_detail" ADD COLUMN blueCw1 INT;
ALTER TABLE "match_detail" ADD COLUMN blueCw2 INT;
ALTER TABLE "match_detail" ADD COLUMN blueCw3 INT;
ALTER TABLE "match_detail" ADD COLUMN blueCw4 INT;
ALTER TABLE "match_detail" ADD COLUMN blueCw5 INT;
ALTER TABLE "match_detail" ADD COLUMN blueCw6 INT;
ALTER TABLE "match_detail" ADD COLUMN blueEc1 INT;
ALTER TABLE "match_detail" ADD COLUMN blueEc2 INT;
ALTER TABLE "match_detail" ADD COLUMN blueEc3 INT;
ALTER TABLE "match_detail" ADD COLUMN blueEc4 INT;
ALTER TABLE "match_detail" ADD COLUMN blueEc5 INT;
ALTER TABLE "match_detail" ADD COLUMN blueEc6 INT;

ALTER TABLE "match_detail" ADD COLUMN coopertition;
ALTER TABLE "match_detail" ADD COLUMN fieldBalanced;
ALTER TABLE "match_detail" ADD COLUMN foodSecured;
