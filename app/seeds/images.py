from app.models import db, PlantImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_plantimages():
    plant_image1 = PlantImage(
        plantId=1,
        pictureURL='https://heirloomroses.com/cdn/shop/products/portlandia-1_8_1800x1800.jpg?v=1666321175',
        isPrimary=True
    )
    plant_image2 = PlantImage(
        plantId=2,
        pictureURL='https://m.media-amazon.com/images/I/41IR0KBJyrL._AC_.jpg',
        isPrimary=True
    )
    plant_image3 = PlantImage(
        plantId=3,
        pictureURL='https://www.blueridgeexotics.com/cdn/shop/products/IMG_20220528_131002_432_1024x1024.jpg?v=1653757955',
        isPrimary=True
    )


    db.session.add(plant_image1)
    db.session.add(plant_image2)
    db.session.add(plant_image3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_plantimages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.plantimages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM plantimages"))

    db.session.commit()
