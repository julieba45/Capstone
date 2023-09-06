from app.models import db, Plant, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_plants():
    plant1 = Plant(
        name='Arbequina Olive Tree',
        species='Olea europaea',
        description='An olive variety from Spain that has a high yield of mild oil and high, constant productivity. Very compact tree, good for intensive planting, small spaces and a great indoor plant.',
        careInstructions='Care : For detailed instructions on watering, pruning, and fertilizing, you may want to refer to a comprehensive guide on olive tree care. Watering & Drought : Olive trees are drought-tolerant but they do need regular watering especially in the first few years. Water deeply and thoroughly allowing the soil to dry out between waterings. Pruning & Fertilizing : Pruning is recommended to maintain the shape and size of the tree and to promote better fruit production. Fertilize with a balanced slow-release fertilizer in spring and fall. Upkeep & Maintenance : Regularly check for pests and diseases. Use a soft brush to remove any dust or debris from the leaves. Please note : that while olive trees can tolerate a range of conditions, they prefer full sun and well-drained soil. Consistent exposure to cold temperatures can lead to damage or even death of the tree.',
        wateringFrequency=1,
        isInBloom=True,
        price=10.0,
        size='small',
    )
    plant2 = Plant(
        name='Meyer Lemon Tree',
        species='Citrus meyeri ',
        description='sleepy tree',
        careInstructions='Care : For detailed instructions on watering, pruning, and fertilizing, you may want to refer to a comprehensive guide on Meyer Lemon Tree care. Sunlight : Meyer Lemon Trees require plenty of sunlight, ideally 6-8 hours a day. If you\'re growing the tree indoors, place it near a south-facing window or supplement natural light with grow lights. Watering & Drought : Water the tree deeply but infrequently. Allow the top 2-3 inches of soil to dry out before watering again. Overwatering can lead to root rot. Pruning & Fertilizing : Prune the tree to maintain its shape and size. Remove any dead, diseased, or crossing branches. Use a slow-release, balanced fertilizer to provide the necessary nutrients. Fertilize in the spring and fall. Please note : Meyer Lemon Trees prefer temperatures between 50-80 degrees Fahrenheit. Protect the tree from freezing temperatures.',
        wateringFrequency=2,
        isInBloom=True,
        price=190.0,
        size='medium',
    )
    plant3 = Plant(
        name='Ficus Bonsai Kokedama',
        species='Ficus microcarpa',
        description="Native to Southwest Asia, this Ficus Bonsai is a member of the fig family and has a sprawling habit with beautiful Banyan tree style roots. The Ficus Bonsai is one of the most popular trees for indoor Bonsai because it is virtually carefree and easy-to-grow for both beginners and Kokedama pros.",
        careInstructions='Care : For detailed instructions on watering, pruning, and fertilizing, you may want to refer to a comprehensive guide on Ficus Bonsai Kokedama care. Sunlight : Ficus Bonsai prefer bright, indirect light. Avoid placing the plant in direct sunlight as it can scorch the leaves. Watering & Drought : Water the plant thoroughly when the moss ball feels light and dry. Submerge the moss ball in water until it\'s fully saturated, then let it drain. Pruning & Fertilizing : Regular pruning helps maintain the shape of the bonsai and promotes denser foliage. Remove any dead or diseased branches. Use a balanced, slow-release fertilizer during the growing season (spring and summer). Please note : Ficus Bonsai prefer warmer temperatures and high humidity. Avoid placing the plant in drafty areas or near heating vents.',
        wateringFrequency=3,
        isInBloom=False,
        price=70.0,
        size='medium',
    )
    plant4 = Plant(
        name='Angel Wings Begonia Kokedama',
        species='Begonia coccinea',
        description='Angel Wings Begonia Kokedama is known for its unique, angel-wing-shaped leaves. The Kokedama technique adds a whimsical touch to the already beautiful plant.',
        careInstructions='Care : For detailed instructions on watering, pruning, and fertilizing Angel Wings Begonia Kokedama, consult an expert or a guide specific to this plant. Sunlight : Angel Wings Begonia thrive in bright, indirect light. Avoid intense direct sunlight, which may cause leaf burn. Watering & Drought : Water the plant thoroughly when the moss ball feels light and dry. Submerge the moss ball in water until fully saturated, then allow it to drain. Mist regularly to maintain humidity. Pruning & Fertilizing : Pruning can be done to maintain shape or remove dead leaves. Use a balanced, slow-release fertilizer during the growing season. Soil & Repotting : Use a well-draining soil mixture suitable for begonias. Kokedama may require rewrapping or repotting over time. Please note : Angel Wings Begonia prefers moderate to high humidity and consistent temperatures. Avoid placing the plant in areas with cold drafts or fluctuating temperatures.',
        wateringFrequency=4,
        isInBloom=True,
        price=120.0,
        size='medium',
    )
    plant5 = Plant(
        name='Rex Begonia Jurassic Kokedama',
        species='Begonia Rex Jurassic',
        description='Rex Begonia Jurassic Kokedama is renowned for its vibrant, textured leaves and the unique Kokedama moss ball planting technique.',
        careInstructions='Care : Follow specific guidelines for Rex Begonia Jurassic Kokedama care, including watering, pruning, and fertilizing. Sunlight : Rex Begonias prefer bright, indirect light but can tolerate lower light conditions. Watering & Drought : Water when the moss ball feels light and dry, and submerge it in water until fully saturated. Drain thoroughly. Mist to maintain humidity. Pruning & Fertilizing : Prune to maintain shape or remove dead leaves. Use a balanced, slow-release fertilizer as needed. Soil & Repotting : Use a well-draining soil mixture suitable for begonias. Kokedama may require rewrapping or repotting over time. Please note : Rex Begonias prefer consistent temperatures and moderate humidity. Avoid placing in areas with cold drafts or direct sunlight.',
        wateringFrequency=4,
        isInBloom=False,
        price=130.0,
        size='medium',
    )
    plant6 = Plant(
        name='Espostoa melanostele \'Peruvian Old Lady\'',
        species='Espostoa melanostele',
        description='Espostoa melanostele, commonly known as the "Peruvian Old Lady", is a columnar cactus native to the Andes mountains in Peru. It is known for its dense white woolly covering which protects it from intense sunlight and cold temperatures.',
        careInstructions='Care : For detailed instructions on watering, pruning, and fertilizing, you may want to refer to a comprehensive guide on Espostoa melanostele care. Sunlight : Prefers full sun to partial shade. If grown indoors, place near a window with bright, indirect light. Watering & Drought : Being a cactus, the "Peruvian Old Lady" is drought-tolerant. Water sparingly, allowing the soil to dry out completely between waterings. Overwatering can lead to root rot. Pruning & Fertilizing : Minimal pruning is required, mostly to remove any dead or damaged parts. Fertilize with a cactus-specific fertilizer during the growing season. Please note : This cactus can tolerate some frost but it is best to protect it from freezing temperatures. The woolly covering can attract pests like mealybugs, so regular inspection is advised.',
        wateringFrequency=3,
        isInBloom=False,
        price=50.0,
        size='medium',
    )
    plant7 = Plant(
        name='Ladyfinger Cactus',
        species='Mammillaria elongata',
        description='The Ladyfinger Cactus, scientifically known as Mammillaria elongata, is a popular cactus native to central Mexico. It is characterized by its elongated tubular segments covered in golden-yellow spines, giving it the appearance of lady fingers. It is a fast-growing cactus that often forms clusters and produces small pink or cream-colored flowers in spring.',
        careInstructions='Care : For detailed instructions on watering, pruning, and fertilizing, you may want to refer to a comprehensive guide on Ladyfinger Cactus care. Sunlight : Prefers full sun but can tolerate partial shade. If grown indoors, ensure it receives ample bright light. Watering & Drought : Being a cactus, the Ladyfinger is drought-tolerant. Water sparingly, allowing the soil to dry out completely between waterings. Overwatering can lead to root rot. Pruning & Fertilizing : Pruning is generally not required unless you want to shape the plant or remove offsets. Fertilize with a cactus-specific fertilizer during the growing season, typically once in spring. Please note : Protect the cactus from freezing temperatures. While it can handle some cold, frost can damage the plant. Regularly inspect for pests like spider mites or mealybugs.',
        wateringFrequency=3,
        isInBloom=True,
        price=25.0,
        size='small',
    )
    plant8 = Plant(
        name='Parlor Palm',
        species='Chamaedorea elegans',
        description='The Parlor Palm, also known as Chamaedorea elegans, is a popular indoor palm native to the rainforests of Southern Mexico and Guatemala. It is known for its elegant, feathery fronds and compact growth, making it a favorite for indoor spaces and offices. The Parlor Palm is slow-growing and can reach heights of 3-4 feet indoors.',
        careInstructions='Care : For detailed instructions on watering, pruning, and fertilizing, you may want to refer to a comprehensive guide on Parlor Palm care. Sunlight : Prefers bright, indirect light but can tolerate low light conditions. Avoid direct sunlight as it can scorch the leaves. Watering & Drought : Water the palm when the top inch of the soil feels dry. Ensure the pot has good drainage to prevent root rot. Overwatering can be harmful. Pruning & Fertilizing : Prune dead or yellowing fronds at the base. Fertilize with a balanced, slow-release fertilizer during the growing season, typically once in spring and once in summer. Please note : Parlor Palms prefer higher humidity but can tolerate average indoor humidity. They are sensitive to cold drafts, so keep them away from doorways and air-conditioning vents.',
        wateringFrequency=2,
        isInBloom=False,
        price=40.0,
        size='medium',
    )
    plant9 = Plant(
        name='Barrel Cactus',
        species='Ferocactus',
        description='The Barrel Cactus, belonging to the Ferocactus genus, is a distinctive and iconic desert cactus. It is characterized by its cylindrical shape, prominent ribs, and long, sharp spines. Native to the deserts of Southwestern North America, this cactus is known for its ability to store water and thrive in extremely hot conditions. Mature plants may produce bright yellow or red flowers at the top during the summer.',
        careInstructions='Care : For detailed instructions on watering, pruning, and fertilizing, you may want to refer to a comprehensive guide on Barrel Cactus care. Sunlight : Thrives in full sun, replicating its natural desert habitat. Watering & Drought : Being a desert plant, the Barrel Cactus is highly drought-tolerant. Water infrequently, allowing the soil to dry out completely between waterings. Overwatering can lead to root rot. Pruning & Fertilizing : Pruning is generally not required. Fertilize sparingly with a cactus-specific fertilizer during the growing season. Please note : The Barrel Cactus can handle high temperatures but should be protected from frost. Its spines are sharp; handle with care and consider its placement, especially if you have pets or children.',
        wateringFrequency=4,
        isInBloom=True,
        price=45.0,
        size='medium',
    )
    plant10 = Plant(
        name='Philodendron Silver',
        species='Philodendron hederaceum \'Silver\'',
        description='Philodendron Silver, a variant of Philodendron hederaceum, is known for its heart-shaped leaves with a unique silver hue. This trailing plant is a popular choice for hanging baskets and indoor plant displays. Native to Central and South America, it is an adaptable houseplant that brings a touch of tropical elegance to any space.',
        careInstructions='Care : For detailed instructions on watering, pruning, and fertilizing, you may want to refer to a comprehensive guide on Philodendron Silver care. Sunlight : Prefers bright, indirect light but can tolerate lower light conditions. Avoid direct sunlight, which can cause leaf burn. Watering & Drought : Water when the top inch of the soil feels dry. Ensure good drainage to prevent root rot. Overwatering can be detrimental. Pruning & Fertilizing : Prune to maintain shape or remove yellowing leaves. Fertilize with a balanced, slow-release fertilizer during the growing season, typically once in spring and once in summer. Please note : Philodendron Silver prefers higher humidity but can adapt to average indoor conditions. Keep away from pets and children as the plant can be toxic if ingested.',
        wateringFrequency=2,
        isInBloom=False,
        price=35.0,
        size='medium',
    )
    plant11 = Plant(
        name='Large Ponytail Palm',
        species='Beaucarnea recurvata',
        description='The Large Ponytail Palm, also known as Elephant Foot, is not a true palm but rather a succulent from the Agave family. Native to eastern Mexico, it is characterized by its bulbous trunk and long, curly leaves that resemble a ponytail, making it a unique and attractive houseplant. Despite its tropical appearance, it is quite drought-tolerant.',
        careInstructions='Care : For detailed instructions on watering, pruning, and fertilizing, you may want to refer to a comprehensive guide on Ponytail Palm care. Sunlight : Prefers bright light but can tolerate some shade. Watering & Drought : Water sparingly, allowing the soil to dry out completely between waterings. Overwatering can lead to root rot. Pruning & Fertilizing : Pruning is generally not required. Fertilize sparingly with a balanced, slow-release fertilizer during the growing season. Please note : The bulbous base stores water, so be cautious not to overwater. It is pet-friendly and not known to be toxic.',
        wateringFrequency=4,
        isInBloom=False,
        price=80.0,
        size='large',
    )
    plant12 = Plant(
        name='Large Stromanthe Triostar',
        species='Stromanthe sanguinea \'Triostar\'',
        description='The Large Stromanthe Triostar is a stunning tropical plant known for its striking variegated leaves in shades of pink, white, and green. Native to the rainforests of Brazil, it brings a vibrant touch to indoor spaces. The undersides of its leaves are a deep magenta, adding to its appeal.',
        careInstructions='Care : For detailed instructions on watering, pruning, and fertilizing, you may want to refer to a comprehensive guide on Stromanthe Triostar care. Sunlight : Prefers bright, indirect light. Direct sunlight can fade its vibrant colors. Watering & Drought : Keep the soil consistently moist but not soggy. High humidity is preferred, so consider misting or using a humidifier. Pruning & Fertilizing : Prune to maintain shape or remove yellowing leaves. Fertilize with a balanced, slow-release fertilizer during the growing season. Please note : Stromanthe Triostar prefers higher humidity and consistent temperatures. Avoid cold drafts. It is pet-friendly and not known to be toxic.',
        wateringFrequency=2,
        isInBloom=False,
        price=90.0,
        size='large',
    )




    db.session.add(plant1)
    db.session.add(plant2)
    db.session.add(plant3)
    db.session.add(plant4)
    db.session.add(plant5)
    db.session.add(plant6)
    db.session.add(plant7)
    db.session.add(plant8)
    db.session.add(plant9)
    db.session.add(plant10)
    db.session.add(plant11)
    db.session.add(plant12)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_plants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.plants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM plants"))

    db.session.commit()
