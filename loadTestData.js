import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);
  db.collection('user').insertMany([
    {
      id: 1,
      username: 'user1@gmail.com',
      password: 'password123',
      role: 'user'
    },
    {
      id: 2,
      username: 'user2@gmail.com',
      password: 'password123',
      role: 'user'
    },
    {
      id: 3,
      username: 'admin1@gmail.com',
      password: 'password123',
      role: 'admin'
    },
    {
      id: 4,
      username: 'admin2@gmail.com',
      password: 'password123',
      role: 'admin'
    }
  ]).then(response => {
    console.info('User', response.insertedCount);
    db.collection('Movies').insertMany([
      {
        'id': 1,
        'title': 'Amityville The Awakening',
        'image': '/images/movies/1.jpg',
        'synopsis' : 'When some footage dating back to 1976 is discovered, the case of the haunted house in Amityville is reopened. An ambitious woman who is working as a television news intern seizes the opportunity to advance her career and is soon leading a team of journalists, clergymen, and paranormal researchers into the house, but she may have unwittingly opened a door to the unreal that she will never be able to close.',
        'director': 'Franck Khalfoun',
        'year': 2017,
        'quantity': 10
      },
      {
        'id': 2,
        'title': 'John Wick 2',
        'image': '/images/movies/2.jpg',
        'synopsis' : 'Retired super-assassin John Wick\'s plans to resume a quiet civilian life are cut short when Italian gangster Santino D\'Antonio shows up on his doorstep with a gold marker, compelling him to repay past favors. Ordered by Winston, kingpin of secret assassin society The Continental, to respect the organization\'s ancient code, Wick reluctantly accepts the assignment to travel to Rome to take out D\'Antonio\'s sister, the ruthless capo atop the Italian Camorra crime syndicate.',
        'director': 'Chad Stahelski',
        'year': 2017,
        'quantity': 10
      },
      {
        'id': 3,
        'title': 'Justice League',
        'image': '/images/movies/3.jpg',
        'synopsis' : 'Fueled by his restored faith in humanity and inspired by Superman\'s (Henry Cavill) selfless act, Bruce Wayne (Ben Affleck) enlists newfound ally Diana Prince to face an even greater threat. Together, Batman and Wonder Woman work quickly to recruit a team to stand against this newly awakened enemy. Despite the formation of an unprecedented league of heroes -- Batman, Wonder Woman, Aquaman, Cyborg and the Flash -- it may be too late to save the planet from an assault of catastrophic proportions.',
        'director': 'Zack Snyder',
        'year': 2017,
        'quantity': 10
      },
      {
        'id': 4,
        'title': 'Logan',
        'image': '/images/movies/4.jpg',
        'synopsis' : 'In the near future, a weary Logan (Hugh Jackman) cares for an ailing Professor X (Patrick Stewart) at a remote outpost on the Mexican border. His plan to hide from the outside world gets upended when he meets a young mutant (Dafne Keen) who is very much like him. Logan must now protect the girl and battle the dark forces that want to capture her.',
        'director': 'James Mangold',
        'year': 2017,
        'quantity': 10
      },
      {
        'id': 5,
        'title': 'The Mummy',
        'image': '/images/movies/5.jpg',
        'synopsis' : 'Nick Morton is a soldier of fortune who plunders ancient sites for timeless artifacts and sells them to the highest bidder. When Nick and his partner come under attack in the Middle East, the ensuing battle accidentally unearths Ahmanet, a betrayed Egyptian princess who was entombed under the desert for thousands of years. With her powers constantly evolving, Morton must now stop the resurrected monster as she embarks on a furious rampage through the streets of London.',
        'director': 'Alex Kurtzman',
        'year': 2017,
        'quantity': 10
      },
      {
        'id': 6,
        'title': 'Pirates of the Caribbean: the curse of the black pearl',
        'image': '/images/movies/6.jpg',
        'synopsis' : 'Capt. Jack Sparrow (Johnny Depp) arrives at Port Royal in the Caribbean without a ship or crew. His timing is inopportune, however, because later that evening the town is besieged by a pirate ship. The pirates kidnap the governor\'s daughter, Elizabeth (Keira Knightley), who\'s in possession of a valuable coin that is linked to a curse that has transformed the pirates into the undead. A gallant blacksmith (Orlando Bloom) in love with Elizabeth allies with Sparrow in pursuit of the pirates.',
        'director': 'Gore Verbinski',
        'year': 2013,
        'quantity': 10
      },
      {
        'id': 7,
        'title': 'Transformers',
        'image': '/images/movies/7.jpg',
        'synopsis' : 'The fate of humanity is at stake when two races of robots, the good Autobots and the villainous Decepticons, bring their war to Earth. The robots have the ability to change into different mechanical objects as they seek the key to ultimate power. Only a human youth, Sam Witwicky (Shia LaBeouf) can save the world from total destruction.',
        'director': 'Michael Bay',
        'year': 2017,
        'quantity': 10
      },
      {
        'id': 8,
        'title': 'Resident Evil: The Final Chapter',
        'image': '/images/movies/8.jpg',
        'synopsis' : 'The T-virus unleashed by the evil Umbrella Corp. has spread to every corner of the globe, infesting the planet with zombies, demons and monsters. Alice (Milla Jovovich), a former Umbrella employee turned rogue warrior, joins her friends on a last-chance mission to storm the company\'s headquarters located deep underneath what used to be Raccoon City. But the Red Queen (Ever Anderson) knows that Alice is coming, and the final battle will determine if the rest of mankind lives or dies.',
        'director': 'Paul W. S. Anderson',
        'year': 2016,
        'quantity': 10
      }
    ])
    .then(response => {
      console.info('movies', response.insertedCount);
      db.collection('Cast').insertMany([
        {'id': 1,'movieId':1,'name': 'Bella Thorne'},
        {'id': 2,'movieId':1,'name': 'Cameron Monaghan'},
        {'id': 3,'movieId':1,'name': 'Jennifer Jason Leigh'},
        {'id': 4,'movieId':1,'name': 'Thomas Mann'},
        {'id': 5,'movieId':1,'name': 'Mckenna Grace'},
        {'id': 6,'movieId':2,'name': 'Keanu Reeves'},
        {'id': 7,'movieId':2,'name': 'Riccardo Scamarcio'},
        {'id': 8,'movieId':2,'name': 'Common'},
        {'id': 9,'movieId':2,'name': 'Ruby Rose'},
        {'id': 10,'movieId':2,'name': 'John Leguizamo'},
        {'id': 11,'movieId':3,'name': 'Ben Affleck'},
        {'id': 12,'movieId':3,'name': 'Henry Cavil'},
        {'id': 13,'movieId':3,'name': 'Gal Gadot'},
        {'id': 14,'movieId':3,'name': 'Jason Momoa'},
        {'id': 15,'movieId':3,'name': 'Ezra Miller'},
        {'id': 16,'movieId':4,'name': 'Hugh Jackman'},
        {'id': 17,'movieId':4,'name': 'Patrick Stewart'},
        {'id': 18,'movieId':4,'name': 'Boyd Holbrook'},
        {'id': 19,'movieId':4,'name': 'Stephen Merchant'},
        {'id': 20,'movieId':4,'name': 'Richard E. Grant'},
        {'id': 21,'movieId':5,'name': 'Tom Cruise'},
        {'id': 22,'movieId':5,'name': 'Annabelle Wallis'},
        {'id': 23,'movieId':5,'name': 'Sofia Boutella'},
        {'id': 24,'movieId':5,'name': 'Jake Johnson'},
        {'id': 25,'movieId':5,'name': 'Courtney B. Vance'},
        {'id': 26,'movieId':6,'name': 'Johnny Depp'},
        {'id': 27,'movieId':6,'name': 'Orlando Bloom'},
        {'id': 28,'movieId':6,'name': 'Keira Knightley'},
        {'id': 29,'movieId':6,'name': 'Jake Johnson'},
        {'id': 30,'movieId':6,'name': 'Jack Davenport'},
        {'id': 31,'movieId':7,'name': 'Shia LaBeouf'},
        {'id': 32,'movieId':7,'name': 'Tyrese Gibson'},
        {'id': 33,'movieId':7,'name': 'Josh Duhamel'},
        {'id': 34,'movieId':7,'name': 'Anthony Anderson'},
        {'id': 35,'movieId':7,'name': 'Megan Fox'},
        {'id': 36,'movieId':8,'name': 'Milla Jovovich'},
        {'id': 37,'movieId':8,'name': 'Ali Larter'},
        {'id': 38,'movieId':8,'name': 'Shawn Roberts'},
        {'id': 39,'movieId':8,'name': 'Ruby Rose'},
        {'id': 40,'movieId':8,'name': 'Eoin Macken'}
      ])
      .then(response => {
        console.info('cast', response.insertedCount);
        db.close();
      });
    });
  });
});
