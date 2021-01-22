#!/usr/bin/env python
#-*- coding:utf-8 -*-
# author:  zsxz
# name:    __init__.py 
# datetime:2021/1/19 10:47
# software:PyCharm
"""
描述：

"""
import os
from datetime import timedelta
from flask import Flask, render_template
from app.home import home as home_blueprint

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)

# 注册蓝图
app.register_blueprint(home_blueprint)

# 添加全局404页面
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404