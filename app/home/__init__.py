#!/usr/bin/env python
#-*- coding:utf-8 -*-
# author:  zsxz
# name:    __init__.py 
# datetime:2021/1/19 11:10
# software:PyCharm
"""
描述：

"""

from flask import Blueprint

home = Blueprint('home', __name__)

import app.home.views
