import { db } from 'api/src/lib/db'

////
//const POSTS = [
//  {
//    id: 1,
//    title: 'Welcome to the blog!',
//    body: "I'm baby single- origin coffee kickstarter lo - fi paleo skateboard.Tumblr hashtag austin whatever DIY plaid knausgaard fanny pack messenger bag blog next level woke.Ethical bitters fixie freegan,helvetica pitchfork 90's tbh chillwave mustache godard subway tile ramps art party. Hammock sustainable twee yr bushwick disrupt unicorn, before they sold out direct trade chicharrones etsy polaroid hoodie. Gentrify offal hoodie fingerstache.",
//  },
//  {
//    id: 2,
//    title: 'A little more about me',
//    body: "Raclette shoreditch before they sold out lyft. Ethical bicycle rights meh prism twee. Tote bag ennui vice, slow-carb taiyaki crucifix whatever you probably haven't heard of them jianbing raw denim DIY hot chicken. Chillwave blog succulents freegan synth af ramps poutine wayfarers yr seitan roof party squid. Jianbing flexitarian gentrify hexagon portland single-origin coffee raclette gluten-free. Coloring book cloud bread street art kitsch lumbersexual af distillery ethical ugh thundercats roof party poke chillwave. 90's palo santo green juice subway tile, prism viral butcher selvage etsy pitchfork sriracha tumeric bushwick.",
//  },
//  {
//    id: 3,
//    title: 'What is the meaning of life?',
//    body: 'Meh waistcoat succulents umami asymmetrical, hoodie post-ironic paleo chillwave tote bag. Trust fund kitsch waistcoat vape, cray offal gochujang food truck cloud bread enamel pin forage. Roof party chambray ugh occupy fam stumptown. Dreamcatcher tousled snackwave, typewriter lyft unicorn pabst portland blue bottle locavore squid PBR&B tattooed.',
//  },
//]
////

export default async () => { 
// check if there's an admin 
//  const demoAdmin = () => {
//    return db.user.findUnique({
//      where: {
//        email: 'admin@admin.io'
//      },
//    })
//  } 
//   
//  const demoKassir = () => {
//    return db.user.findUnique({
//      where: {
//        email: 'kassir@kassir.io'
//      },
//    })
//  }

  
// create an admin user 
  await db.user.upsert({
    where: { id: 1 }, 
    update: {
      name: 'Ellie Meyer', 
      email: 'admin@admin.net', 
    },
    create: {
      id: 1,
      name: 'Ellie Meyer',
      email: 'admin@admin.io', 
      roles: 'admin', 
      hashedPassword:
        'ad9563042fe9f154419361eeeb775d8a12f3975a3722953fd8e326dd108d5645',
      salt: '1c99de412b219e9abf4665293211adce',
    },

  }) 

 // create a kassir user 
  await db.user.upsert({
    where: { id: 2 },
    create: {
      id: 2,
      name: 'John Doe',
      email: 'kassir@kassir.io', 
      roles: 'kassir', 
      hashedPassword:
        'ad9563042fe9f154419361eeeb775d8a12f3975a3722953fd8e326dd108d5645',
      salt: '1c99de412b219e9abf4665293211adce',
    },
    update: {
      name: 'John Pupsik', 
      email: 'kassir@kassir.net', 
    },
  }) 
    
////
//    for (const post of POSTS) {
//      await db.post.upsert({
//        where: { id: post.id },
//        create: { ...post },
//        update: {},
//      })
//  
//      console.log(`  Seeded "${post.title}"`)
//  }
////

  
  
  // 
  const usersEmail = await db.user.findMany() 
  const usersTotal = await db.user.count()
  
  if (usersEmail?.length) console.info('Specified admins emails: ', usersEmail[0].email, ' | ',  usersEmail[1].email) 
  console.info('__________________________') 
  console.info('And Total users number: ', usersTotal)

  
}
