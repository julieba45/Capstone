from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_favorites():
    plant_favorite1 = Favorite(
        userId=1,
        gardenName='My Garden',
        plantId=1,
        position=1,
    )
    plant_favorite2 = Favorite(
        userId=1,
        gardenName='My Flower Garden',
        plantId=2,
        position=2,
    )
    plant_favorite3 = Favorite(
        userId=2,
        gardenName='My Garden',
        plantId=1,
        position=3,
    )


    db.session.add(plant_favorite1)
    db.session.add(plant_favorite2)
    db.session.add(plant_favorite3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
