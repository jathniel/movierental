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
        'title': 'Amityville The Awakening',
        'image': '/images/movies/1.jpg',
        'synopsis' : 'When some footage dating back to 1976 is discovered, the case of the haunted house in Amityville is reopened. An ambitious woman who is working as a television news intern seizes the opportunity to advance her career and is soon leading a team of journalists, clergymen, and paranormal researchers into the house, but she may have unwittingly opened a door to the unreal that she will never be able to close.',
        'director': 'Franck Khalfoun',
        'year': 2017,
        'quantity': 10,
        'casts':['Bella Thorne', 'Cameron Monaghan', 'Jennifer Jason Leigh', 'Thomas Mann', 'Mckenna Grace']
      },
      {
        'title': 'John Wick 2',
        'image': '/images/movies/2.jpg',
        'synopsis' : 'Retired super-assassin John Wick\'s plans to resume a quiet civilian life are cut short when Italian gangster Santino D\'Antonio shows up on his doorstep with a gold marker, compelling him to repay past favors. Ordered by Winston, kingpin of secret assassin society The Continental, to respect the organization\'s ancient code, Wick reluctantly accepts the assignment to travel to Rome to take out D\'Antonio\'s sister, the ruthless capo atop the Italian Camorra crime syndicate.',
        'director': 'Chad Stahelski',
        'year': 2017,
        'quantity': 10,
        'casts': ['Keanu Reeves', 'Riccardo Scamarcio', 'Common', 'Ruby Rose', 'John Leguizamo']
      },
      {
        'title': 'Justice League',
        'image': '/images/movies/3.jpg',
        'synopsis' : 'Fueled by his restored faith in humanity and inspired by Superman\'s (Henry Cavill) selfless act, Bruce Wayne (Ben Affleck) enlists newfound ally Diana Prince to face an even greater threat. Together, Batman and Wonder Woman work quickly to recruit a team to stand against this newly awakened enemy. Despite the formation of an unprecedented league of heroes -- Batman, Wonder Woman, Aquaman, Cyborg and the Flash -- it may be too late to save the planet from an assault of catastrophic proportions.',
        'director': 'Zack Snyder',
        'year': 2017,
        'quantity': 10,
        'casts':[ 'Ben Affleck','Henry Cavil', 'Gal Gadot','Jason Momoa','Ezra Miller']
      },
      {
        'title': 'Logan',
        'image': '/images/movies/4.jpg',
        'synopsis' : 'In the near future, a weary Logan (Hugh Jackman) cares for an ailing Professor X (Patrick Stewart) at a remote outpost on the Mexican border. His plan to hide from the outside world gets upended when he meets a young mutant (Dafne Keen) who is very much like him. Logan must now protect the girl and battle the dark forces that want to capture her.',
        'director': 'James Mangold',
        'year': 2017,
        'quantity': 10,
        'casts': ['Hugh Jackman','Patrick Stewart','Boyd Holbrook','Stephen Merchant', 'Richard E. Grant']
      },
      {
        'title': 'The Mummy',
        'image': '/images/movies/5.jpg',
        'synopsis' : 'Nick Morton is a soldier of fortune who plunders ancient sites for timeless artifacts and sells them to the highest bidder. When Nick and his partner come under attack in the Middle East, the ensuing battle accidentally unearths Ahmanet, a betrayed Egyptian princess who was entombed under the desert for thousands of years. With her powers constantly evolving, Morton must now stop the resurrected monster as she embarks on a furious rampage through the streets of London.',
        'director': 'Alex Kurtzman',
        'year': 2017,
        'quantity': 10,
        'casts': ['Tom Cruise','Annabelle Wallis','Sofia Boutella','Jake Johnson','Courtney B. Vance']
      },
      {
        'title': 'Pirates of the Caribbean: the curse of the black pearl',
        'image': '/images/movies/6.jpg',
        'synopsis' : 'Capt. Jack Sparrow (Johnny Depp) arrives at Port Royal in the Caribbean without a ship or crew. His timing is inopportune, however, because later that evening the town is besieged by a pirate ship. The pirates kidnap the governor\'s daughter, Elizabeth (Keira Knightley), who\'s in possession of a valuable coin that is linked to a curse that has transformed the pirates into the undead. A gallant blacksmith (Orlando Bloom) in love with Elizabeth allies with Sparrow in pursuit of the pirates.',
        'director': 'Gore Verbinski',
        'year': 2013,
        'quantity': 10,
        'casts': ['Johnny Depp', 'Orlando Bloom', 'Keira Knightley','Jake Johnson','Jack Davenport']
      },
      {
        'title': 'Transformers',
        'image': '/images/movies/7.jpg',
        'synopsis' : 'The fate of humanity is at stake when two races of robots, the good Autobots and the villainous Decepticons, bring their war to Earth. The robots have the ability to change into different mechanical objects as they seek the key to ultimate power. Only a human youth, Sam Witwicky (Shia LaBeouf) can save the world from total destruction.',
        'director': 'Michael Bay',
        'year': 2017,
        'quantity': 10,
        'casts': ['Shia LaBeouf', 'Tyrese Gibson','Josh Duhamel','Anthony Anderson', 'Megan Fox']
      },
      {
        'title': 'Resident Evil: The Final Chapter',
        'image': '/images/movies/8.jpg',
        'synopsis' : 'The T-virus unleashed by the evil Umbrella Corp. has spread to every corner of the globe, infesting the planet with zombies, demons and monsters. Alice (Milla Jovovich), a former Umbrella employee turned rogue warrior, joins her friends on a last-chance mission to storm the company\'s headquarters located deep underneath what used to be Raccoon City. But the Red Queen (Ever Anderson) knows that Alice is coming, and the final battle will determine if the rest of mankind lives or dies.',
        'director': 'Paul W. S. Anderson',
        'year': 2016,
        'quantity': 10,
        'casts': ['Milla Jovovich','Ali Larter','Shawn Roberts','Ruby Rose','Eoin Macken']
      }
    ])
    .then(response => {
      console.info('movie', response.insertedCount);
      db.close();
    });
  });
});
