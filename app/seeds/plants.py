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


    db.session.add(plant1)
    db.session.add(plant2)
    db.session.add(plant3)
    db.session.add(plant4)
    db.session.add(plant5)
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
