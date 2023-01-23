const { PrismaClient } = require("@prisma/client");
const appConst = require("../appConstants");
const prisma = new PrismaClient();


const connect = async (req, res) => {
  try {
    const resp = await prisma.client.create({
      data: req.body,
    });
    res.status(200).json({
      message: appConst.status.success,
      Response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: appConst.status.fail,
      Response: error.message,
    });
  }
};


const create = async (req, res) => {
  try {
    const data = []
    const findclient = await prisma.client.findMany({
      where: {
        clientName: req.body.clientName
      },
      include: {
        user: true
      }
    });
    const finduser = await prisma.user.findMany({
      where: {
        userName: req.body.userName
      },
    });
    data.push(finduser)
    console.log(data);
    //   if(find){
    //   const resp = await prisma.client.create({
    //     data:req.body
    //   });
    // }
    res.status(200).json({
      message: appConst.status.success,
      Response: { finduser, findclient },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: appConst.status.fail,
      Response: error.message,
    });
  }
};


const find = async (req, res) => {
  try {
    let update
    const temp = []
    const find_user = await prisma.client.findFirst({
      where: {
        clientName: req.body.clientName,
      },
    });
    if (find_user) {
      const update_client = await prisma.client.update({
        where: {
          id: find_user.id,
        },
        data: {
          clientName: req.body.clientName,
        },
      })
      let record = []
      // console.log(update_client.id)
      result = req.body.user.createMany.data;
      result.forEach(async element => {
        const resp = await prisma.user.findFirst({
          where: {
            userName: element.userName,
          },
        })
        if (resp) {
          update = await prisma.user.update({
            where: {
              id: resp.id,
            },
            data: {
              userName: element.userName,
              clientId: update_client.id
            },
          })
          temp.push(update)
          // console.log(update)
        } else {
          const create = await prisma.user.create({
            data: {
              userName: element.userName,
              clientId: update_client.id
            },
          })
          temp.push(create)
        }
      });

    } else {
      const create_client = await prisma.client.create({
        data: {
          clientName: req.body.clientName,
        }
      })
      console.log(create_client.id)
      result = req.body.user.createMany.data;
      result.forEach(async element => {
        const resp = await prisma.user.findFirst({
          where: {
            userName: element.userName,
          },
        })
        if (resp) {
          update = await prisma.user.update({
            where: {
              id: resp.id,
            },
            data: {
              userName: element.userName,
              clientId: create_client.id
            },
          })
          temp.push(update)
          // console.log(update)
        } else {
          const create = await prisma.user.create({
            data: {
              userName: element.userName,
              clientId: create_client.id
            },
          })
          temp.push(create)
          // console.log(create)
        }
      });
    }
    // const transaction = await prisma.$transaction([resp,resp1])
    res.status(200).json({
      message: appConst.status.success,
      response: JSON.stringify(temp)

    });
  } catch (error) {
    res.status(400).json({
      message: appConst.status.fail,
      Response: error.message,
    });
  }
}

// project 
// create



// const project = async (req, res) => {
//   try {
//     let record = []
//     let data = []
//     let respData;
//     const find_client = await prisma.client.findFirst({
//       where: {
//         clientName: req.body.clientName,
//       },
//     });

//     if (find_client) {
//       respData = find_client(find_client)
//     } else {
//       respData = createClientRecord(find_client)
//     }


//     let tx = await prisma.$transaction([respData])
//     res.status(200).json({
//       response: tx,
//     });


//   }
//   catch (error) {
//     console.log(error);
//     res.status(400).json({
//       response: error.message
//     })
//   }
// }


const project = async (req, res) => {
  try {
    let record = []
    let data = []
    const find_client = await prisma.client.findFirst({
      where: {
        clientName: req.body.clientName,
      },
    });
if (find_client) {
  const update_client = await prisma.client.update({
    where: {
      id: find_client.id,
    },
    data: {
      clientName: req.body.clientName,
    },
  })
  // record.push(update_client)
  result = req.body.user.createMany.data;
  // connect = req.body.user.connect
  for (let i = 0; i < result.length; i++) {
    let temp = []
    // console.log(result[i].userName)
    const resp = await prisma.user.findFirst({
      where: {
        userName: result[i].userName,
        // clientId: find_client.id
        // clientId: update_client.id
      },
    })
    if (resp) {        
     const update = await prisma.user.update({
        where: {
          id: resp.id,
        },
        data: {
          userName: result[i].userName,
          clientId: find_client.id
        // clientId: update_client.id
        },
      })
      temp.push(update)
    } else {
      const create = await prisma.user.create({
        data: {
          userName: result[i].userName,
          clientId: find_client.id
          // clientId: update_client.id
        },
      })
      temp.push(create)
    }
    record.push(temp)
  }
  console.log(record)
  // const transaction = await prisma.$transaction([update_client])
  // data.push(transaction)
  // console.log(record)
} else {
  const create_client = prisma.client.create({
    data: {
      clientName: req.body.clientName,
    }
  })
  // record.push(create_client)
  result = req.body.user.createMany.data;
  for (let i = 0; i < result.length; i++) {
    let temp = []
    const resp = await prisma.user.findFirst({
      where: {
        userName: result[i].userName,
      },
    })
    if (resp) {
      // const update = await prisma.client.update({
      //   where: {
      //     clientName: req.body.clientName,
      //   },
      //   data: {
      //     user: {
      //       update: {
      //         where: {
      //           userName: result[i].userName,
      //         },
      //         data: {
      //           userName: result[i].userName
      //         }
      //       },
      //     },

      //   },
      // });
const update = await prisma.user.update({
  where: {
    id: resp.id,
  },
  data: {
    userName: result[i].userName,
    // clientId: connect.id
    // clientId: create_client.id
  },
})
  temp.push(update)
} else {
const create = await prisma.client.update({
  where: {
    clientName: req.body.clientName,
  },
  data: {
    user: {
      create: {
        userName: result[i].userName,
      },
    },
  },
});
// const create = await prisma.user.create({
//   data: {
//     userName: result[i].userName,
//     // clientId: find_client1.id
//     clientId: create_client.id
//   },
// })
        temp.push(create)
      }
      record.push(temp)
    }
    // const transaction = await prisma.$transaction([create_client])
    // data.push(transaction)
  }
  // const transaction = await prisma.$transaction([create_client,update_client])

  res.status(200).json({
    message: appConst.status.success,
    Response: record
  });
} catch (error) {
  console.log(error.message)
  res.status(400).json({
    message: appConst.status.fail,
    Response: error.message,
  });
}
}

// let respData;
// async function find_client(find_client) {
//   let record = []
//   let temp = []
//   if (find_client) {
//     const update_client = prisma.client.update({
//       where: {
//         id: find_client.id,
//       },
//       data: {
//         clientName: req.body.clientName,
//       },
//     })
//     // record.push(update_client)
//     result = req.body.user.createMany.data;
//     // connect = req.body.user.connect
//     for (let i = 0; i < result.length; i++) {
//       let temp = []
//       // console.log(result[i].userName)
//       const resp = await prisma.user.findFirst({
//         where: {
//           userName: result[i].userName,
//           // clientId: find_client.id
//           // clientId: update_client.id
//         },
//       })
//       if (resp) {
//         const update = await prisma.user.update({
//           where: {
//             id: resp.id,
//           },
//           data: {
//             userName: result[i].userName,
//             clientId: find_client.id
//             // clientId: update_client.id
//           },
//         })
//         temp.push(update)
//       } else {
//         const create = await prisma.user.create({
//           data: {
//             userName: result[i].userName,
//             clientId: find_client.id
//             // clientId: update_client.id
//           },
//         })
//         temp.push(create)
//       }
//       record.push(temp)
//     }

//   }
// }

//create client 
// async function createClientRecord() {
//   let record = []
//   let temp = []
//   const create = await prisma.client.update({
//     where: {
//       clientName: req.body.clientName,
//     },
//     data: {
//       user: {
//         create: {
//           userName: result[i].userName,
//         },
//       },
//     },
//   });
//   // const create = await prisma.user.create({
//   //   data: {
//   //     userName: result[i].userName,
//   //     // clientId: find_client1.id
//   //     clientId: create_client.id
//   //   },
//   // })
//   temp.push(create);
//   record.push(temp)

// }

// const transaction = await prisma.$transaction([create_client])
// data.push(transaction)

// const transaction = await prisma.$transaction([create_client,update_client])


module.exports = { connect, create, find, project };