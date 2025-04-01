from app import app, db
from flask import request, jsonify
from models import Task

# To get all tasks
@app.route("/api/tasks", methods =["GET"])
def get_tasks():
   tasks = Task.query.all()
   result = [task.to_json() for task in tasks]
   #[{...},{...}]
   return jsonify(result)
   #default 200 so leave it

# To create a task
@app.route("/api/tasks", methods =["POST"])
def create_task():
   try: 
      data = request.json

      required_fields = ["name", "time due", "description", "importance"]
      for field in required_fields:
         if field not in data:
            return jsonify({"error": f'Missing required field: {field}'}), 400

      name = data.get("name")
      time_due = data.get("time due")
      description = data.get("description")
      importance = data.get("importance")

      #avatar image will be based on initails of name
      img_url = f"https://avatar.iran.liara.run/username?username={name}"

      new_task = Task(name=name, time_due="time due", description= description, importance=importance, img_url=img_url)

      db.session.add(new_task)
      db.session.commit()

      return jsonify({"msg":"task created successfully"}), 201
      #201 for resource created
   
   except Exception as e:
      db.session.rollback()
      return jsonify({"error":str(e)}), 500
   
# To delete a task
@app.route("/api/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
   try:
      task = Task.query.get(id)
      if task is None:
         return jsonify({"error": "Task not found"}), 404
      
      db.session.delete(task)
      db.session.commit()
      return jsonify ({"msg":"Task deleted"}), 200
   
   except Exception as e:
      db.session.rollback()
      return jsonify({"error": str(e)}), 500
   
# To update a task
@app.route("/api/tasks/<int:id>", methods=["PATCH"])
def update_task(id):
   try:
      task = Task.query.get(id)
      if task is None:
         return jsonify({"error": "Task not found"}), 404
      
      data = request.json

      task.name = data.get("name", task.name)
      task.time_due = data.get("time due", task.time_due)
      task.description = data.get("description", task.description)
      task.importance = data.get("importance", task.importance)

      db.session.commit()
      return jsonify(task.to_json()), 200

   except Exception as e:
      db.session.rollback()
      return jsonify({"error": str(e)}), 500