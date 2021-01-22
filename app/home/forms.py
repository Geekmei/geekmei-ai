#!/usr/bin/env python
# -*- coding:utf-8 -*-
# author:  zsxz
# name:    froms 
# datetime:2021/1/21 16:36
# software:PyCharm
"""
描述：

"""

from flask_wtf import FlaskForm
from wtforms import StringField, FileField


class PostFrom(FlaskForm):
    urlPath = StringField(
        label='url'
    )

    filePath = FileField(
        label='file'
    )
