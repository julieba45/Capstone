from app.models import db, Plant, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_plants():
    plant1 = Plant(
        name='Rose',
        species='Rosa',
        description='A beautiful red rose',
        careInstructions='Water daily',
        wateringFrequency=1,
        isInBloom=True,
        price=10.0,
        size='small',
    )
    plant2 = Plant(
        name='Weeping Willow Tree',
        species='Salix babylonica ',
        description='sleepy tree',
        careInstructions='Water daily, prefers well-drained soils that have medium to wet moisture.',
        wateringFrequency=1,
        isInBloom=True,
        price=190.0,
        size='large',
    )
    plant3 = Plant(
        name='Venus flytrap',
        species='D. muscipula',
        description='A trapping plant that eats insects',
        careInstructions='Water daily',
        wateringFrequency=2,
        isInBloom=False,
        price=70.0,
        size='medium',
    )
    plant4 = Plant(
        name='purple passionflower',
        species='P. incarnata',
        description=' known as maypop, purple passionflower, true passionflower, wild apricot, and wild passion vine, is a fast-growing perennial vine with climbing or trailing stems.',
        careInstructions='Water daily',
        wateringFrequency=3,
        isInBloom=False,
        price=90.0,
        size='small',
    )
    plant5 = Plant(
        name='socotra dragon tree',
        species='D. cinnabari',
        description='Blood dragon tree with unique upturn appearance',
        careInstructions='Water daily',
        wateringFrequency=1,
        isInBloom=False,
        price=1080.0,
        size='large',
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
