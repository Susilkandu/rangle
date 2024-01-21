function main(io) {
  const Randomstring = require('randomstring');

  let plrr = [];
  let roomline = [];
  let room;
  let roomId;
  const OUser = require('../models/userModels.js');
  io.on('connection', async (socket) => {
    socket.on('rChatRandomly', async (RandomId) => {
      let details = await OUser.userSchema.findById({ _id: RandomId }).then((details) => {
        plrr.push(RandomId);
        if (plrr.length % 2 === 1) {
          room = new OUser.ChatRoom({ fplr: { id: RandomId, name: details.uname }, splr: { id: 'null', name: 'null' } }).save().then((room) => {
            roomline.push(room._id);
            roomId = roomline[0];
            roomId = `${roomId}`.split('new ObjectId"');
            socket.join(roomId);
          }).catch((error) => {
            console.log(error.message);
          });
        }
        else {
          let roomId = roomline[0];
          roomId = `${roomId}`.split('new ObjectId"');
          socket.join(roomId);
          OUser.ChatRoom.updateOne({ _id: roomId }, { $set: { splr: { id: details._id, name: details.uname } } }).then((data) => {
            plrr.shift();
            plrr.shift();
            roomline.shift();
            io.to(roomId).emit('joined', roomId);
          }).catch((error) => {
            console.log(error.message);
          });

        };
      });
    });
    socket.on('kaunhai', async (roomId, req, res) => {
      let details = OUser.ChatRoom.findOne({ _id: roomId }).then((details) => {
        let fid = details.fplr.id;
        let fname = details.fplr.name;
        let sid = details.splr.id;
        let sname = details.splr.name;
        socket.emit('mainhu', fid, fname, sid, sname);
      }).catch((error) => {
        console.log(error.message);
      });
    });
    socket.on('message', async (message, rid) => {
      socket.to(rid).emit('incommingmsg', message);
    });
    socket.on('typing', async (rid) => {
      socket.to(rid).emit('styping');
    });
    socket.on('typingstop', async (rid) => {
      socket.to(rid).emit('stypingstop');
    });
    socket.on('disconnect', async () => {
      console.log('connection closed');
    });
    socket.on('delete', async (rid) => {
      OUser.ChatRoom.findById({ _id: rid }).then(() => {
        socket.to(rid).emit('left');
        OUser.ChatRoom.deleteOne({ _id: rid }).then(() => {
          console.log('deleted');
        }).catch((error) => {
          console.log(error.message)
        });
      }).catch((error) => {
        console.log(error.message);
      })

    });

  });
};
module.exports = {
  main
}